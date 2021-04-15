resource "aws_ecs_task_definition" "api_task" {
  family                   = "${var.app}-task-${var.environment}"
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
    "image": "${var.default_jobs_image}",
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
        "value": "true"
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
        "name": "DATABASE_HOST",
        "value": "${split("/", mongodbatlas_cluster.api_cluster.srv_address)[2]}"
      },
      {
        "name": "DATABASE_PORT",
        "value": "27017"
      },
      {
        "name": "DATABASE_NAME",
        "value": "${var.app}"
      },
      {
        "name": "DATABASE_USERNAME",
        "value": "${var.mongo_master_user}"
      },
      {
        "name": "DATABASE_PASSWORD",
        "value": "${var.mongo_master_password}"
      },
      {
        "name": "MONGODB_URI",
        "value": "mongodb+srv://${var.mongo_master_user}:${var.mongo_master_password}@${split("/", mongodbatlas_cluster.api_cluster.srv_address)[2]}/${var.app}?retryWrites=true&w=majority"
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/fargate/service/${var.app}-task-${var.environment}",
        "awslogs-region": "us-east-2",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }
]
DEFINITION


  tags = var.tags
}

resource "aws_ecs_service" "api_task" {
  name            = "${var.app}-task-${var.environment}"
  cluster         = aws_ecs_cluster.app.id
  launch_type     = "FARGATE"
  task_definition = aws_ecs_task_definition.api_task.arn
  desired_count   = 1

  network_configuration {
    security_groups = [aws_security_group.nsg_task.id]
    subnets           = var.internal == true ? local.private_subnets : local.public_subnets
    assign_public_ip  = true
  }

  tags                    = var.tags
  enable_ecs_managed_tags = true
  propagate_tags          = "SERVICE"

  # [after initial apply] don't override changes made to task_definition
  # from outside of terraform (i.e.; fargate cli)
  lifecycle {
    ignore_changes = [task_definition]
  }
}

# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
resource "aws_iam_role" "ecsTaskExecutionRoleApiTask" {
  name               = "${var.app}-task-${var.environment}-ecs"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRoleApiTask_policy" {
  role       = aws_iam_role.ecsTaskExecutionRoleApiTask.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "logs_api_task" {
  name              = "/fargate/service/${var.app}-task-${var.environment}"
  retention_in_days = var.logs_retention_in_days
  tags              = var.tags
}
