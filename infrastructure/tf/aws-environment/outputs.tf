#
# Outputs Configuration
#

# The AWS keys for the CICD user to use in a build system
output "cicd_keys" {
  value = "terraform state show aws_iam_access_key.cicd_keys"
}

# The AWS credentials
output "cicd_keys_credentials" {
  value = "[${var.environment}] - ${aws_iam_access_key.cicd_keys.id}:${aws_iam_access_key.cicd_keys.secret}"
}

# The URL for the docker image repo in ECR
output "docker_registry" {
  value = data.aws_ecr_repository.ecr.repository_url
}

# The load balancer DNS name
output "lb_dns" {
  value = aws_alb.main.dns_name
}

# The private subnets
output "private_subnets" {
  value = [aws_subnet.subnet_private_1.id, aws_subnet.subnet_private_2.id]
}

# The public subnets
output "public_subnets" {
  value = [aws_subnet.subnet_public_1.id, aws_subnet.subnet_public_2.id]
}

# Command to view the status of the Fargate service
output "status" {
  value = "fargate service info"
}

# Command to deploy a new task definition to the service using Docker Compose
output "deploy" {
  value = "fargate service deploy -f docker-compose.yml"
}

# Command to scale up cpu and memory
output "scale_up" {
  value = "fargate service update -h"
}

# Command to scale out the number of tasks (container replicas)
output "scale_out" {
  value = "fargate service scale -h"
}

# command to deploy the secrets sidecar configuration
output "deploy_secrets_sidecar" {
  value = "[${var.environment}] fargate service deploy --revision ${split(":", aws_ecs_task_definition.secrets_sidecar.arn)[6]}"
}

output "ssm_add_secret" {
  value = "[${var.environment}] aws ssm put-parameter --overwrite --type \"SecureString\" --key-id \"${aws_kms_alias.ssm.name}\" --name \"/${var.app}/${var.environment}/PASSWORD\" --value \"password\""
}

output "ssm_add_secret_ref" {
  value = "[${var.environment}] fargate service env set --secret PASSWORD=/${var.app}/${var.environment}/PASSWORD"
}

output "ssm_key_id" {
  value = aws_kms_key.ssm.key_id
}

output "secrets" {
  value = local.env_vars
}

output "elasticache" {
  value = aws_elasticache_cluster.redis_session_store.cache_nodes[0]
}
