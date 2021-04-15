# Separate project for each environment

resource "mongodbatlas_project" "project" {
  name   = "${var.environment}-clusters"
  org_id = var.atlas_organization_id
}

resource "mongodbatlas_cluster" "api_cluster" {
  project_id   = mongodbatlas_project.project.id
  name         = "PROJECT_NAME-${var.environment}-rs"
  cluster_type = "REPLICASET"

  replication_factor           = 3
  provider_backup_enabled      = false
  auto_scaling_disk_gb_enabled = false
  mongo_db_major_version       = "4.2"

  //Provider Settings "block"
  provider_name               = "AWS" # AWS for dedicated plan, TENANT for shared plan
  # backing_provider_name       = "AWS" # only for shared plans
  provider_instance_size_name = var.mongo_cluster_tier
  provider_region_name        = "US_EAST_2"
}

resource "mongodbatlas_database_user" "api_cluster_user" {
  username            = var.mongo_master_user
  password            = var.mongo_master_password
  project_id          = mongodbatlas_project.project.id
  auth_database_name  = "admin"

  roles {
    role_name     = "readWriteAnyDatabase"
    database_name = "admin"
  }
}

resource "mongodbatlas_network_container" "api_cluster_container" {
  project_id       = mongodbatlas_project.project.id
  atlas_cidr_block = "172.31.16.0/21"
  provider_name    = "AWS"
  region_name      = "US_EAST_2"
}

resource "mongodbatlas_network_peering" "api_cluster_peering" {
  accepter_region_name   = var.region
  project_id             = mongodbatlas_project.project.id
  container_id           = mongodbatlas_network_container.api_cluster_container.container_id
  provider_name          = "AWS"
  route_table_cidr_block = aws_vpc.vpc.cidr_block
  vpc_id                 = aws_vpc.vpc.id
  aws_account_id         = data.aws_caller_identity.current.account_id
}

# the following assumes an AWS provider is configured  
resource "aws_vpc_peering_connection_accepter" "peer" {
  vpc_peering_connection_id = mongodbatlas_network_peering.api_cluster_peering.connection_id
  auto_accept = true
}

resource "mongodbatlas_project_ip_whitelist" "ecs_tasks_sg" {
  project_id         = mongodbatlas_project.project.id
  aws_security_group = aws_security_group.nsg_task.id
  comment            = "Allow the Fargate tasks security group to have access to MongoDB Atlas peering"

  depends_on = [mongodbatlas_network_peering.api_cluster_peering]
}

######## IMPORTANT!!! ########
# If not in development environment, delete this resource
# This opens up the mongodb cluster to everyone
##############################
# resource "mongodbatlas_project_ip_whitelist" "all" {
#   project_id         = mongodbatlas_project.project.id
#   cidr_block         = "0.0.0.0/0"
#   comment            = "Allow all. DELETE THIS IN PRODUCTION!!!"
# }
