#
# Terraform specific configuration
#

terraform {
  required_version    = "0.14.5"

  backend "s3" {
    encrypt        = false
    bucket         = "PROJECT_NAME-infra"
    region         = "us-east-1"
    key            = "iac/terraform/infra"
    dynamodb_table = "terraform"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.26"
    }
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 0.8"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 2.2"
    }
  }
}
