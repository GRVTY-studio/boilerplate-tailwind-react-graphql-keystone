#
# Variables Configuration
#

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-2"
}

variable "aws_profile" {
  description = "AWS config profile"
  type        = string
  default     = "default"
}

variable "image_tag_mutability" {
  type        = string
  default     = "MUTABLE"
  description = "The tag mutability setting for the ECR repository (defaults to MUTABLE)"
}

variable "developers" {
  description = "List of developer users"
  type        = list(string)
}

variable "default_tags" {
  type        = map
}

variable "app" {
  type        = string
  description = "App name"
}
