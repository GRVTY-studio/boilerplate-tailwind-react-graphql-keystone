#
# Provider Configuration
#

provider "aws" {
  region      = var.aws_region
  profile     = var.aws_profile
  # version     = "~> 2.56"
}

provider "archive" {
  # version     = "~> 1.3"
}

provider "local" {
  # version     = "~> 1.4"
}

provider "template" {
  # version     = "~> 2.1"
}
