/**
 * Elastic Container Service (ecs)
 * This component is required to create the Fargate ECS service. It will create a Fargate cluster
 * based on the application name and enironment. It will create a "Task Definition", which is required
 * to run a Docker container, https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html.
 * Next it creates a ECS Service, https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html
 * It attaches the Load Balancer created in `lb.tf` to the service, and sets up the networking required.
 * It also creates a role with the correct permissions. And lastly, ensures that logs are captured in CloudWatch.
 *
 * When building for the first time, it will install a "default backend", which is a simple web service that just
 * responds with a HTTP 200 OK. It's important to uncomment the lines noted below after you have successfully
 * migrated the real application containers to the task definition.
 */

resource "aws_ecs_cluster" "app" {
  name = "${var.app}-${var.environment}"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  tags = var.tags
}

resource "aws_appautoscaling_target" "app_scale_target" {
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.app.name}/${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  max_capacity       = var.ecs_autoscale_max_instances
  min_capacity       = var.ecs_autoscale_min_instances
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app}-${var.environment}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn

  # defined in role.tf
  task_role_arn = aws_iam_role.app_role.arn

  container_definitions = <<DEFINITION
[
  {
    "name": "${var.container_name}",
    "image": "${var.default_backend_image}",
    "essential": true,
    "interactive": true,
    "pseudoTerminal": true,
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": ${var.container_port},
        "hostPort": ${var.container_port}
      }
    ],
    "environment": [
      {
        "name": "PORT",
        "value": "${var.container_port}"
      },
      {
        "name": "HEALTHCHECK",
        "value": "${var.health_check}"
      },
      {
        "name": "ENABLE_LOGGING",
        "value": "false"
      },
      {
        "name": "PRODUCT",
        "value": "${var.app}"
      },
      {
        "name": "ENVIRONMENT",
        "value": "${var.environment}"
      },
      {
        "name": "DATABASE_URL",
        "value": "mongodb+srv://${var.mongo_master_user}:${var.mongo_master_password}@${split("/", mongodbatlas_cluster.api_cluster.srv_address)[2]}/${var.app}?retryWrites=true&w=majority"
      },
      {
        "name": "MAILCHIMP_API_KEY",
        "value": "${local.env_vars["MAILCHIMP_API_KEY"]}"
      },
      {
        "name": "GOOGLE_OAUTH_CLIENT_ID",
        "value": "${local.env_vars["GOOGLE_OAUTH_CLIENT_ID"]}"
      },
      {
        "name": "GOOGLE_OAUTH_CLIENT_SECRET",
        "value": "${local.env_vars["GOOGLE_OAUTH_CLIENT_SECRET"]}"
      },
      {
        "name": "SES_API_KEY",
        "value": "${local.env_vars["SES_API_KEY"]}"
      },
      {
        "name": "REDIS_URL",
        "value": "${aws_elasticache_cluster.redis_session_store.cache_nodes[0].address}:${aws_elasticache_cluster.redis_session_store.cache_nodes[0].port}"
      },
      {
        "name": "FRONTEND_URI",
        "value": "https://${var.site_domain_name}"
      },
      {
        "name": "SERVER_URI",
        "value": "https://${var.api_domain_name}"
      },
      {
        "name": "COOKIE_SECRET",
        "value": "${random_string.cookie_secret.result}"
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/fargate/service/${var.app}-${var.environment}",
        "awslogs-region": "us-east-2",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }
]
DEFINITION


  tags = var.tags
}

resource "aws_ecs_service" "app" {
  name            = "${var.app}-${var.environment}"
  cluster         = aws_ecs_cluster.app.id
  launch_type     = "FARGATE"
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.replicas

  network_configuration {
    security_groups = [aws_security_group.nsg_task.id]
    subnets           = var.internal == true ? local.private_subnets : local.public_subnets
    assign_public_ip  = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.main.id
    container_name   = var.container_name
    container_port   = var.container_port
  }

  tags                    = var.tags
  enable_ecs_managed_tags = true
  propagate_tags          = "SERVICE"

  # workaround for https://github.com/hashicorp/terraform/issues/12634
  depends_on = [aws_alb_listener.http]

  # [after initial apply] don't override changes made to task_definition
  # from outside of terraform (i.e.; fargate cli)
  # lifecycle {
  #   ignore_changes = [task_definition]
  # }
}

# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "${var.app}-${var.environment}-ecs"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "logs" {
  name              = "/fargate/service/${var.app}-${var.environment}"
  retention_in_days = var.logs_retention_in_days
  tags              = var.tags
}
