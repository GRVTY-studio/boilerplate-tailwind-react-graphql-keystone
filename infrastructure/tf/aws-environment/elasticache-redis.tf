# Use Easticache for a Redis cluster

resource "aws_elasticache_subnet_group" "redis_session_store" {
  name       = "${var.environment}-redis-session-store-subnet-group"
  subnet_ids = local.private_subnets
}

resource "aws_elasticache_cluster" "redis_session_store" {
  cluster_id           = "${var.environment}-redis-session-store"
  subnet_group_name    = aws_elasticache_subnet_group.redis_session_store.name
  engine               = "redis"
  node_type            = var.cache_node_type
  num_cache_nodes      = var.num_cache_nodes
  parameter_group_name = "default.redis5.0"
  engine_version       = var.redis_version
  port                 = var.redis_port
}