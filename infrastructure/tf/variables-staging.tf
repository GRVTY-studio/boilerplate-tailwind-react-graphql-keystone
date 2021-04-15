
#########################
######## STAGING ########
#########################

variable "staging_app" {
  
}

# The domain name for the environment
variable "staging_root_domain_name" {
    type    = string
}

# The subdomain for the frontend (CF+S3)
variable "staging_site_domain_name" {
    type    = string
}

# The subdomain for the backoffice (CF+S3)
variable "staging_backoffice_domain_name" {
    type    = string
}

# The subdomain for the kabinett (CF+S3)
variable "staging_kabinett_domain_name" {
    type    = string
}

# The subdomain for the API (Fargate+ALB)
variable "staging_api_domain_name" {
    type    = string
}

# ElastiCache Redis node type (session store)
variable "staging_cache_node_type" {
  type = string
  default = "cache.t3.micro"
}

# ElastiCache number of Redis nodes
variable "staging_num_cache_nodes" {
  type = number
  default = 1
}

# ElastiCache Redis engine version
variable "staging_redis_version" {
  type = string
  default = "5.0.6"
}

# ElastiCache Redis port
variable "staging_redis_port" {
  type = number
  default = 6379
}

# MongoDB Atlas Organization ID
variable "staging_atlas_organization_id" {
  type = string
  default = "1951338"
}

# MongoDB Atlas master user to be created
variable "staging_mongo_master_user" {
  type = string
  description = "MongoDB Atlas master user to be created"
  default = "mongoadmin"
}

# MongoDB Atlas master user password
variable "staging_mongo_master_password" {
  type = string
  description = "MongoDB Atlas master user password"
}

# MongoDB Atlas cluster tier
variable "staging_mongo_cluster_tier" {
  type = string
  description = "MongoDB Atlas cluster tier"
}

variable "staging_certificate_arn" {
  
}

variable "staging_container_name" {
  
}

variable "staging_container_port" {
  
}

variable "staging_default_backend_image" {
  
}

variable "staging_default_jobs_image" {
  
}

variable "staging_deregistration_delay" {
  
}

variable "staging_ecs_as_cpu_high_threshold_per" {
  
}

variable "staging_ecs_as_cpu_low_threshold_per" {
  
}

variable "staging_ecs_autoscale_max_instances" {
  
}

variable "staging_ecs_autoscale_min_instances" {
  
}

variable "staging_environment" {
  
}

variable "staging_health_check" {
  
}

variable "staging_health_check_interval" {
  
}

variable "staging_health_check_matcher" {
  
}

variable "staging_health_check_timeout" {
  
}

variable "staging_https_port" {
  
}

variable "staging_internal" {
  
}

variable "staging_lb_port" {
  
}

variable "staging_lb_protocol" {
  
}

variable "staging_logs_retention_in_days" {
  
}

variable "staging_region" {
  
}

variable "staging_replicas" {
  
}

variable "staging_saml_role" {
  
}

variable "staging_scale_down_cron" {
  
}

variable "staging_scale_down_max_capacity" {
  
}

variable "staging_scale_down_min_capacity" {
  
}

variable "staging_scale_up_cron" {
  
}

variable "staging_secret_dir" {
  
}

variable "staging_secret_sidecar_image" {
  
}

variable "staging_secrets_saml_users" {
  
}

variable "staging_tags" {
  
}