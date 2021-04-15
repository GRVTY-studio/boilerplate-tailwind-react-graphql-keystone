/*
 * variables.tf
 * Common variables to use in various Terraform files (*.tf)
 */

# The AWS region to use for the prod environment's infrastructure
# Currently, Fargate is only available in `us-east-2`.
variable "region" {
  type = string
  description = "The AWS region to use for the prod environment infrastructure. Currently, Fargate is only available in us-east-2."
  default = "us-east-2"
}

# Tags for the infrastructure
variable "tags" {
  type = map(string)
  description = "Tags for the infrastructure"
}

# The application's name
variable "app" {
  type = string
  description = "The application name"
  default = "PROJECT_NAME-api"
}

variable "api_docker_ecr" {
}

variable "jobs_docker_ecr" {
}

# The environment that is being built
variable "environment" {
  type = string
  description = "The target environment"
  default = "production"
}

# The domain name for the environment
variable "root_domain_name" {
  type = string
  description = "The root domain name used by the environment"
}

# The domain name for the environment
variable "create_root_s3" {
  type = bool
  default = false
  description = "Create and manage the root S3 bucket"
}

# The subdomain for the frontend (CF+S3)
variable "site_domain_name" {
  type    = string
  description = "The FQDN where the static website will be deployed using CloudFront and S3. Must be a subdomain of the root domain name."
}

# The subdomain for the backoffice (CF+S3)
variable "backoffice_domain_name" {
  type    = string
  description = "The FQDN where the backoffice static website will be deployed using CloudFront and S3. Must be a subdomain of the root domain name."
}

# The subdomain for the kabinett (CF+S3)
variable "kabinett_domain_name" {
  type    = string
  description = "The FQDN where the kabinett static website will be deployed using CloudFront and S3. Must be a subdomain of the root domain name."
}

# The subdomain for the API (Fargate+ALB)
variable "api_domain_name" {
  type    = string
  description = "The FQDN where the API will be deployed using Fargate and ALB. Must be a subdomain of the root domain name."
}

# The default Route53 record TTL (in seconds)
variable "dns_record_ttl" {
  type = string
  description = "The default Route53 record TTL (in seconds)"
  default = "300"
}

# ElastiCache Redis node type (session store)
variable "cache_node_type" {
  type = string
  description = "ElastiCache Redis node type (used as a session store)"
  default = "cache.t3.micro"
}

# ElastiCache number of Redis nodes
variable "num_cache_nodes" {
  type = number
  description = "ElastiCache number of Redis nodes"
  default = 1
}

# ElastiCache Redis engine version
variable "redis_version" {
  type = string
  description = "ElastiCache Redis engine version"
  default = "5.0.6"
}

# ElastiCache Redis port
variable "redis_port" {
  type = number
  description = "ElastiCache Redis port"
  default = 6379
}

# MongoDB Atlas Organization ID
variable "atlas_organization_id" {
  type = string
  description = "MongoDB Atlas Organization ID"
  default = "5e859e456b868c5eee7e761b"
}

# MongoDB Atlas master user to be created
variable "mongo_master_user" {
  type = string
  description = "MongoDB Atlas master user to be created"
  default = "mongoadmin"
}

# MongoDB Atlas master user password
variable "mongo_master_password" {
  type = string
  description = "MongoDB Atlas master user password"
}

# MongoDB Atlas cluster tier
variable "mongo_cluster_tier" {
  type = string
  description = "MongoDB Atlas cluster tier"
}

# The port the container will listen on, used for load balancer health check
# Best practice is that this value is higher than 1024 so the container processes
# isn't running at root.
variable "container_port" {
}

# The port the load balancer will listen on
variable "lb_port" {
  default = "80"
}

# The load balancer protocol
variable "lb_protocol" {
  default = "HTTP"
}

# If the average CPU utilization over a minute drops to this threshold,
# the number of containers will be reduced (but not below ecs_autoscale_min_instances).
variable "ecs_as_cpu_low_threshold_per" {
  default = "20"
}

# If the average CPU utilization over a minute rises to this threshold,
# the number of containers will be increased (but not above ecs_autoscale_max_instances).
variable "ecs_as_cpu_high_threshold_per" {
  default = "80"
}

# Default scale up at 7 am weekdays, this is UTC so it doesn't adjust to daylight savings
# https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
variable "scale_up_cron" {
  default = "cron(0 11 ? * MON-FRI *)"
}

# Default scale down at 7 pm every day
variable "scale_down_cron" {
  default = "cron(0 23 * * ? *)"
}

# The mimimum number of containers to scale down to.
# Set this and `scale_down_max_capacity` to 0 to turn off service on the `scale_down_cron` schedule.
variable "scale_down_min_capacity" {
  default = 0
}

# The maximum number of containers to scale down to.
variable "scale_down_max_capacity" {
  default = 0
}

# How many containers to run
variable "replicas" {
  default = "1"
}

# The name of the container to run
variable "container_name" {
  default = "app"
}

# The minimum number of containers that should be running.
# Must be at least 1.
# used by both autoscale-perf.tf and autoscale.time.tf
# For production, consider using at least "2".
variable "ecs_autoscale_min_instances" {
  default = "1"
}

# The maximum number of containers that should be running.
# used by both autoscale-perf.tf and autoscale.time.tf
variable "ecs_autoscale_max_instances" {
  default = "8"
}

# The default docker image to deploy with the infrastructure.
# Note that you can use the fargate CLI for application concerns
# like deploying actual application images and environment variables
# on top of the infrastructure provisioned by this template
variable "default_backend_image" {
  default = "quay.io/turner/turner-defaultbackend:0.2.0"
}

# The default jobs docker image to deploy with the infrastructure.
variable "default_jobs_image" {
  default = "quay.io/turner/turner-defaultbackend:0.2.0"
}

variable "logs_retention_in_days" {
  type        = number
  default     = 90
  description = "Specifies the number of days you want to retain log events"
}

# The port to listen on for HTTPS, always use 443
variable "https_port" {
  default = "443"
}

# The ARN for the SSL certificate
variable "certificate_arn" {}

# Whether the application is available on the public internet,
# also will determine which subnets will be used (public or private)
variable "internal" {
  default = true
}

# The amount time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused
variable "deregistration_delay" {
  default = "30"
}

# The path to the health check for the load balancer to know if the container(s) are ready
variable "health_check" {
}

# How often to check the liveliness of the container
variable "health_check_interval" {
  default = "30"
}

# How long to wait for the response on the health check path
variable "health_check_timeout" {
  default = "10"
}

# What HTTP response code to listen for
variable "health_check_matcher" {
  default = "200"
}

variable "lb_access_logs_expiration_days" {
  default = "3"
}

# The SAML role to use for adding users to the ECR policy
variable "saml_role" {
}

variable "secret_dir" {
  type        = string
  default     = "/var/secret"
  description = "directory where secret is written"
}

variable "secret_sidecar_image" {
  type        = string
  default     = "quay.io/turner/secretsmanager-sidecar"
  description = "sidecar container that writes the secret to a file accessible by app container"
}

# The users (email addresses) from the saml role to give access
variable "secrets_saml_users" {
  type = list(string)
}