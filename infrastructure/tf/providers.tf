#
# Provider Configuration
#

# provider "aws" {
#   region      = var.aws_region
#   profile     = var.aws_profile
#   version     = "~> 3.26"
# }

provider "aws" {
  alias       = "useast1"
  region      = "us-east-1"
}

provider "aws" {
  alias       = "awsdefault"
  region      = var.aws_region
}

# provider "mongodbatlas" {
#   version     = "~> 0.8"
# }

# provider "archive" {
#   version     = "~> 2.0"
# }

# provider "local" {
#   version     = "~> 2.0"
# }

# provider "template" {
#   version     = "~> 2.2"
# }
