#
# Outputs Configuration
#

# The AWS credentials
output "base_config" {
  value = module.base
}

output "dev" {
  value = module.dev
}

output "staging" {
  value = module.staging
}

output "prod" {
  value = module.prod
}

output "prod_cicd_keys_credentials" {
  value = "[${timestamp()}] ====> CI/CD credentials: ${module.dev.cicd_keys_credentials}"
}

# command to deploy the secrets sidecar configuration
output "prod_deploy_secrets_sidecar" {
  value = "[${timestamp()}] ====> ${module.dev.deploy_secrets_sidecar}"
}

output "prod_ssm_add_secret" {
  value = "[${timestamp()}] ====> ${module.dev.ssm_add_secret}"
}

output "prod_ssm_add_secret_ref" {
  value = "[${timestamp()}] ====> ${module.dev.ssm_add_secret_ref}"
}