#
# Variables Configuration
#

variable "image_tag_mutability" {
  type        = string
  default     = "MUTABLE"
  description = "The tag mutability setting for the ECR repository (defaults to MUTABLE)"
}

variable "default_tags" {
  type        = map
}

variable "developers" {
  description = "List of developer users"
  type        = list(string)
}

variable "app" {
  type        = string
  description = "App name"
}
