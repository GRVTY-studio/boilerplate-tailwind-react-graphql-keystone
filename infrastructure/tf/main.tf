#
# The main terraform file
#

module "base" {
  source                            = "./_base"
  app                               = var.app
  default_tags                      = var.default_tags
  image_tag_mutability              = var.image_tag_mutability
  developers                        = var.developers
}

module "dev" {
  providers = {
    # aws = aws
    aws.useast1 = aws.useast1
  }
  source                        = "./aws-environment"
  app                           = var.dev_app
  api_docker_ecr                = module.base.api_docker_ecr
  jobs_docker_ecr               = module.base.jobs_docker_ecr
  root_domain_name              = var.dev_root_domain_name
  site_domain_name              = var.dev_site_domain_name
  backoffice_domain_name        = var.dev_backoffice_domain_name
  kabinett_domain_name          = var.dev_kabinett_domain_name
  api_domain_name               = var.dev_api_domain_name
  cache_node_type               = var.dev_cache_node_type
  num_cache_nodes               = var.dev_num_cache_nodes
  redis_version                 = var.dev_redis_version
  redis_port                    = var.dev_redis_port
  atlas_organization_id         = var.dev_atlas_organization_id
  mongo_master_user             = var.dev_mongo_master_user
  mongo_master_password         = var.dev_mongo_master_password
  mongo_cluster_tier            = var.dev_mongo_cluster_tier
  certificate_arn               = var.dev_certificate_arn
  container_name                = var.dev_container_name
  container_port                = var.dev_container_port
  default_backend_image         = var.dev_default_backend_image
  default_jobs_image            = var.dev_default_jobs_image
  deregistration_delay          = var.dev_deregistration_delay
  ecs_as_cpu_high_threshold_per = var.dev_ecs_as_cpu_high_threshold_per
  ecs_as_cpu_low_threshold_per  = var.dev_ecs_as_cpu_low_threshold_per
  ecs_autoscale_max_instances   = var.dev_ecs_autoscale_max_instances
  ecs_autoscale_min_instances   = var.dev_ecs_autoscale_min_instances
  environment                   = var.dev_environment
  health_check                  = var.dev_health_check
  health_check_interval         = var.dev_health_check_interval
  health_check_matcher          = var.dev_health_check_matcher
  health_check_timeout          = var.dev_health_check_timeout
  https_port                    = var.dev_https_port
  internal                      = var.dev_internal
  lb_port                       = var.dev_lb_port
  lb_protocol                   = var.dev_lb_protocol
  logs_retention_in_days        = var.dev_logs_retention_in_days
  region                        = var.dev_region
  replicas                      = var.dev_replicas
  saml_role                     = var.dev_saml_role
  scale_down_cron               = var.dev_scale_down_cron
  scale_down_max_capacity       = var.dev_scale_down_max_capacity
  scale_down_min_capacity       = var.dev_scale_down_min_capacity
  scale_up_cron                 = var.dev_scale_up_cron
  secret_dir                    = var.dev_secret_dir
  secret_sidecar_image          = var.dev_secret_sidecar_image
  secrets_saml_users            = var.dev_secrets_saml_users
  tags                          = var.dev_tags
}

module "staging" {
  providers = {
    # aws = aws
    aws.useast1 = aws.useast1
  }
  source                        = "./aws-environment"
  app                           = var.staging_app
  api_docker_ecr                = module.base.api_docker_ecr
  jobs_docker_ecr               = module.base.jobs_docker_ecr
  root_domain_name              = var.staging_root_domain_name
  site_domain_name              = var.staging_site_domain_name
  backoffice_domain_name        = var.staging_backoffice_domain_name
  kabinett_domain_name          = var.staging_kabinett_domain_name
  api_domain_name               = var.staging_api_domain_name
  cache_node_type               = var.staging_cache_node_type
  num_cache_nodes               = var.staging_num_cache_nodes
  redis_version                 = var.staging_redis_version
  redis_port                    = var.staging_redis_port
  atlas_organization_id         = var.staging_atlas_organization_id
  mongo_master_user             = var.staging_mongo_master_user
  mongo_master_password         = var.staging_mongo_master_password
  mongo_cluster_tier            = var.staging_mongo_cluster_tier
  certificate_arn               = var.staging_certificate_arn
  container_name                = var.staging_container_name
  container_port                = var.staging_container_port
  default_backend_image         = var.staging_default_backend_image
  default_jobs_image            = var.staging_default_jobs_image
  deregistration_delay          = var.staging_deregistration_delay
  ecs_as_cpu_high_threshold_per = var.staging_ecs_as_cpu_high_threshold_per
  ecs_as_cpu_low_threshold_per  = var.staging_ecs_as_cpu_low_threshold_per
  ecs_autoscale_max_instances   = var.staging_ecs_autoscale_max_instances
  ecs_autoscale_min_instances   = var.staging_ecs_autoscale_min_instances
  environment                   = var.staging_environment
  health_check                  = var.staging_health_check
  health_check_interval         = var.staging_health_check_interval
  health_check_matcher          = var.staging_health_check_matcher
  health_check_timeout          = var.staging_health_check_timeout
  https_port                    = var.staging_https_port
  internal                      = var.staging_internal
  lb_port                       = var.staging_lb_port
  lb_protocol                   = var.staging_lb_protocol
  logs_retention_in_days        = var.staging_logs_retention_in_days
  region                        = var.staging_region
  replicas                      = var.staging_replicas
  saml_role                     = var.staging_saml_role
  scale_down_cron               = var.staging_scale_down_cron
  scale_down_max_capacity       = var.staging_scale_down_max_capacity
  scale_down_min_capacity       = var.staging_scale_down_min_capacity
  scale_up_cron                 = var.staging_scale_up_cron
  secret_dir                    = var.staging_secret_dir
  secret_sidecar_image          = var.staging_secret_sidecar_image
  secrets_saml_users            = var.staging_secrets_saml_users
  tags                          = var.staging_tags
}

module "prod" {
  providers = {
    # aws = aws
    aws.useast1 = aws.useast1
  }
  source                        = "./aws-environment"
  app                           = var.prod_app
  api_docker_ecr                = module.base.api_docker_ecr
  jobs_docker_ecr               = module.base.jobs_docker_ecr
  root_domain_name              = var.prod_root_domain_name
  site_domain_name              = var.prod_site_domain_name
  backoffice_domain_name        = var.prod_backoffice_domain_name
  kabinett_domain_name          = var.prod_kabinett_domain_name
  api_domain_name               = var.prod_api_domain_name
  cache_node_type               = var.prod_cache_node_type
  num_cache_nodes               = var.prod_num_cache_nodes
  redis_version                 = var.prod_redis_version
  redis_port                    = var.prod_redis_port
  atlas_organization_id         = var.prod_atlas_organization_id
  mongo_master_user             = var.prod_mongo_master_user
  mongo_master_password         = var.prod_mongo_master_password
  mongo_cluster_tier            = var.prod_mongo_cluster_tier
  certificate_arn               = var.prod_certificate_arn
  container_name                = var.prod_container_name
  container_port                = var.prod_container_port
  default_backend_image         = var.prod_default_backend_image
  default_jobs_image            = var.prod_default_jobs_image
  deregistration_delay          = var.prod_deregistration_delay
  ecs_as_cpu_high_threshold_per = var.prod_ecs_as_cpu_high_threshold_per
  ecs_as_cpu_low_threshold_per  = var.prod_ecs_as_cpu_low_threshold_per
  ecs_autoscale_max_instances   = var.prod_ecs_autoscale_max_instances
  ecs_autoscale_min_instances   = var.prod_ecs_autoscale_min_instances
  environment                   = var.prod_environment
  health_check                  = var.prod_health_check
  health_check_interval         = var.prod_health_check_interval
  health_check_matcher          = var.prod_health_check_matcher
  health_check_timeout          = var.prod_health_check_timeout
  https_port                    = var.prod_https_port
  internal                      = var.prod_internal
  lb_port                       = var.prod_lb_port
  lb_protocol                   = var.prod_lb_protocol
  logs_retention_in_days        = var.prod_logs_retention_in_days
  region                        = var.prod_region
  replicas                      = var.prod_replicas
  saml_role                     = var.prod_saml_role
  scale_down_cron               = var.prod_scale_down_cron
  scale_down_max_capacity       = var.prod_scale_down_max_capacity
  scale_down_min_capacity       = var.prod_scale_down_min_capacity
  scale_up_cron                 = var.prod_scale_up_cron
  secret_dir                    = var.prod_secret_dir
  secret_sidecar_image          = var.prod_secret_sidecar_image
  secrets_saml_users            = var.prod_secrets_saml_users
  tags                          = var.prod_tags
}
