#
# Terraform specific configuration
#

terraform {
  backend "s3" {
    encrypt         = false
    bucket          = "PROJECT_NAME-infra"
    region          = "us-east-1"
    key             = "iac/terraform/prerequisites"
    dynamodb_table  = "terraform"
  }
}
