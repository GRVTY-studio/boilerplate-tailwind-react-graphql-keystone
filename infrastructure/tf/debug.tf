# variable "root_domain_name" {
#   default = "PROJECT_NAME.TOP_LEVEL_DOMAIN"
# }

# data "terraform_remote_state" "prerequisites" {
#   backend = "s3"

#   config = {
#     bucket          = "PROJECT_NAME-infra"
#     region          = "us-east-1"
#     key             = "iac/terraform/prerequisites"
#   }
# }

# resource "aws_acm_certificate" "root" {
#   domain_name       = "*.${var.root_domain_name}"
#   validation_method = "DNS"

#   tags = var.tags

#   lifecycle {
#     create_before_destroy = true
#   }
# }

# resource "aws_route53_record" "root_validation" {
#   name    = tolist(aws_acm_certificate.root.domain_validation_options).0.resource_record_name
#   type    = tolist(aws_acm_certificate.root.domain_validation_options).0.resource_record_type
#   zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
#   records = [tolist(aws_acm_certificate.root.domain_validation_options).0.resource_record_value]
#   ttl     = 600
# }

# output "debug" {
#   value = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
# }

# output "debug-dns" {
#   value = tolist(aws_acm_certificate.root.domain_validation_options).0
# }

# output "debug_ecr" {
#   value = "${module.base.api_docker_repo}, ${module.base.jobs_docker_repo}"
# }

# data "aws_ecr_repository" "ecr" {
#   name = module.base.api_docker_repo_name
# }

# data "aws_ecr_repository" "jobs" {
#   name = module.base.jobs_docker_repo_name
# }