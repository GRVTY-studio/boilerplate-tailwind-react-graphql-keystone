#
# Variables Configuration
#

variable "developers" {
  description = "List of developer users"
  type        = list(string)
  default     = ["dave", "eduard"]
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "aws_profile" {
  description = "AWS config profile"
  type        = string
  default     = "default"
}

variable "domains" {
  description = "List of domains managed by Route53"
  type        = map
  default     = {
    "PROJECT_NAME_us" = "PROJECT_NAME.TOP_LEVEL_DOMAIN"
  }
}
