
#####################
######## DEV ########
#####################

variable "dev_app" {
  
}

# The domain name for the environment
variable "dev_root_domain_name" {
    type    = string
}

# The subdomain for the frontend (CF+S3)
variable "dev_site_domain_name" {
    type    = string
}

# The subdomain for the backoffice (CF+S3)
variable "dev_backoffice_domain_name" {
    type    = string
}

# The subdomain for the kabinett (CF+S3)
variable "dev_kabinett_domain_name" {
    type    = string
}

# The subdomain for the API (Fargate+ALB)
variable "dev_api_domain_name" {
    type    = string
}

# ElastiCache Redis node type (session store)
variable "dev_cache_node_type" {
  type = string
  default = "cache.t3.micro"
}

# ElastiCache number of Redis nodes
variable "dev_num_cache_nodes" {
  type = number
  default = 1
}

# ElastiCache Redis engine version
variable "dev_redis_version" {
  type = string
  default = "5.0.6"
}

# ElastiCache Redis port
variable "dev_redis_port" {
  type = number
  default = 6379
}

# MongoDB Atlas Organization ID
variable "dev_atlas_organization_id" {
  type = string
  default = "1951338"
}

# MongoDB Atlas master user to be created
variable "dev_mongo_master_user" {
  type = string
  description = "MongoDB Atlas master user to be created"
  default = "mongoadmin"
}

# MongoDB Atlas master user password
variable "dev_mongo_master_password" {
  type = string
  description = "MongoDB Atlas master user password"
}

# MongoDB Atlas cluster tier
variable "dev_mongo_cluster_tier" {
  type = string
  description = "MongoDB Atlas cluster tier"
}

variable "dev_certificate_arn" {
  
}

variable "dev_container_name" {
  
}

variable "dev_container_port" {
  
}

variable "dev_default_backend_image" {
  
}

variable "dev_default_jobs_image" {
  
}

variable "dev_deregistration_delay" {
  
}

variable "dev_ecs_as_cpu_high_threshold_per" {
  
}

variable "dev_ecs_as_cpu_low_threshold_per" {
  
}

variable "dev_ecs_autoscale_max_instances" {
  
}

variable "dev_ecs_autoscale_min_instances" {
  
}

variable "dev_environment" {
  
}

variable "dev_health_check" {
  
}

variable "dev_health_check_interval" {
  
}

variable "dev_health_check_matcher" {
  
}

variable "dev_health_check_timeout" {
  
}

variable "dev_https_port" {
  
}

variable "dev_internal" {
  
}

variable "dev_lb_port" {
  
}

variable "dev_lb_protocol" {
  
}

variable "dev_logs_retention_in_days" {
  
}

variable "dev_region" {
  
}

variable "dev_replicas" {
  
}

variable "dev_saml_role" {
  
}

variable "dev_scale_down_cron" {
  
}

variable "dev_scale_down_max_capacity" {
  
}

variable "dev_scale_down_min_capacity" {
  
}

variable "dev_scale_up_cron" {
  
}

variable "dev_secret_dir" {
  
}

variable "dev_secret_sidecar_image" {
  
}

variable "dev_secrets_saml_users" {
  
}

variable "dev_tags" {
  
}