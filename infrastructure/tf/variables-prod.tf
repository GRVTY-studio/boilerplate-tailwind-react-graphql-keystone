
######################
######## PROD ########
######################

variable "prod_app" {
  
}

# The domain name for the environment
variable "prod_root_domain_name" {
    type    = string
}

# The subdomain for the frontend (CF+S3)
variable "prod_site_domain_name" {
    type    = string
}

# The subdomain for the backoffice (CF+S3)
variable "prod_backoffice_domain_name" {
    type    = string
}

# The subdomain for the kabinett (CF+S3)
variable "prod_kabinett_domain_name" {
    type    = string
}

# The subdomain for the API (Fargate+ALB)
variable "prod_api_domain_name" {
    type    = string
}

# ElastiCache Redis node type (session store)
variable "prod_cache_node_type" {
  type = string
  default = "cache.t3.micro"
}

# ElastiCache number of Redis nodes
variable "prod_num_cache_nodes" {
  type = number
  default = 1
}

# ElastiCache Redis engine version
variable "prod_redis_version" {
  type = string
  default = "5.0.6"
}

# ElastiCache Redis port
variable "prod_redis_port" {
  type = number
  default = 6379
}

# MongoDB Atlas Organization ID
variable "prod_atlas_organization_id" {
  type = string
  default = "1951338"
}

# MongoDB Atlas master user to be created
variable "prod_mongo_master_user" {
  type = string
  description = "MongoDB Atlas master user to be created"
  default = "mongoadmin"
}

# MongoDB Atlas master user password
variable "prod_mongo_master_password" {
  type = string
  description = "MongoDB Atlas master user password"
}

# MongoDB Atlas cluster tier
variable "prod_mongo_cluster_tier" {
  type = string
  description = "MongoDB Atlas cluster tier"
}

variable "prod_certificate_arn" {
  
}

variable "prod_container_name" {
  
}

variable "prod_container_port" {
  
}

variable "prod_default_backend_image" {
  
}

variable "prod_default_jobs_image" {
  
}

variable "prod_deregistration_delay" {
  
}

variable "prod_ecs_as_cpu_high_threshold_per" {
  
}

variable "prod_ecs_as_cpu_low_threshold_per" {
  
}

variable "prod_ecs_autoscale_max_instances" {
  
}

variable "prod_ecs_autoscale_min_instances" {
  
}

variable "prod_environment" {
  
}

variable "prod_health_check" {
  
}

variable "prod_health_check_interval" {
  
}

variable "prod_health_check_matcher" {
  
}

variable "prod_health_check_timeout" {
  
}

variable "prod_https_port" {
  
}

variable "prod_internal" {
  
}

variable "prod_lb_port" {
  
}

variable "prod_lb_protocol" {
  
}

variable "prod_logs_retention_in_days" {
  
}

variable "prod_region" {
  
}

variable "prod_replicas" {
  
}

variable "prod_saml_role" {
  
}

variable "prod_scale_down_cron" {
  
}

variable "prod_scale_down_max_capacity" {
  
}

variable "prod_scale_down_min_capacity" {
  
}

variable "prod_scale_up_cron" {
  
}

variable "prod_secret_dir" {
  
}

variable "prod_secret_sidecar_image" {
  
}

variable "prod_secrets_saml_users" {
  
}

variable "prod_tags" {
  
}