data "aws_caller_identity" "current" {}

data "terraform_remote_state" "prerequisites" {
  backend = "s3"

  config = {
    bucket          = "PROJECT_NAME-infra"
    region          = "us-east-1"
    key             = "iac/terraform/prerequisites"
  }
}

data "template_file" "lambda_source" {
  template = <<EOF
exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));
}
EOF

}

data "archive_file" "lambda_zip" {
  type                    = "zip"
  source_content          = data.template_file.lambda_source.rendered
  source_content_filename = "index.js"
  output_path             = "lambda-${var.app}.zip"
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_elb_service_account" "main" {
}

# TODO: fill out custom policy
data "aws_iam_policy_document" "app_policy" {
  statement {
    actions = [
      "ecs:DescribeClusters",
    ]

    resources = [
      aws_ecs_cluster.app.arn,
    ]
  }
}

# allow role to be assumed by ecs and local saml users (for development)
data "aws_iam_policy_document" "app_role_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }

    principals {
      type = "AWS"

      identifiers = [
        "arn:aws:sts::${data.aws_caller_identity.current.account_id}:assumed-role/${var.saml_role}/me@example.com",
      ]
    }
  }
}# grant required permissions to deploy
data "aws_iam_policy_document" "cicd_policy" {
  # allows user to push/pull to the registry
  statement {
    sid = "ecr"

    actions = [
      "ecr:UploadLayerPart",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetAuthorizationToken",
      "ecr:CompleteLayerUpload",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
    ]

    resources = [
      data.aws_ecr_repository.ecr.arn,
      data.aws_ecr_repository.jobs.arn,
    ]
  }

  # allows user to deploy to ecs
  statement {
    sid = "ecs"

    actions = [
      "ecr:GetAuthorizationToken",
      "ecs:DescribeServices",
      "ecs:DescribeTaskDefinition",
      "ecs:UpdateService",
      "ecs:RegisterTaskDefinition",
    ]

    resources = [
      "*",
    ]
  }

  # allows user to deploy to s3
  statement {
    sid = "s3"

    actions = [
      "s3:*",
    ]

    resources = [
      "*",
    ]
  }

  # allows user to control to cloudfront
  statement {
    sid = "cloudfront"

    actions = [
      "cloudfront:*",
    ]

    resources = [
      "*",
    ]
  }

  # allows user to run ecs task using task execution and app roles
  statement {
    sid = "approle"

    actions = [
      "iam:PassRole",
    ]

    resources = [
      aws_iam_role.app_role.arn,
      aws_iam_role.ecsTaskExecutionRole.arn,
    ]
  }
}

data "aws_ecr_repository" "ecr" {
  name = var.api_docker_ecr.name
  registry_id = var.api_docker_ecr.registry_id
}

data "aws_ecr_repository" "jobs" {
  name = var.jobs_docker_ecr.name
  registry_id = var.jobs_docker_ecr.registry_id
}


data "template_file" "secrets_sidecar_deploy" {
  template = <<EOF
#!/bin/bash
set -e

AWS_DEFAULT_REGION=$${region}

echo "backing up running container configuration"
fargate task describe -t $${current_taskdefinition} > backup.yml

echo "deploying new sidecar configuration"
fargate service deploy -r $${sidecar_revision}

echo "re-deploying app configuration"
fargate service deploy -f backup.yml
fargate service env set -e SECRET=$${secret}
EOF

  vars = {
    region                 = var.region
    current_taskdefinition = aws_ecs_service.app.task_definition
    sidecar_revision       = split(":", aws_ecs_task_definition.secrets_sidecar.arn)[6]
    secret                 = local.secret_file
  }
}

# the kms key policy
data "aws_iam_policy_document" "kms_resource_policy_doc" {
  statement {
    sid    = "DenyWriteToAllExceptSAMLUsers"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_write_actions
    resources = ["*"]

    condition {
      test     = "StringNotLike"
      variable = "aws:userId"
      values   = local.saml_user_ids
    }
  }

  statement {
    sid    = "DenyReadToAllExceptRoleAndSAMLUsers"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_read_actions
    resources = ["*"]

    condition {
      test     = "StringNotLike"
      variable = "aws:userId"
      values   = local.role_and_saml_ids
    }
  }

  statement {
    sid    = "AllowWriteToSAMLUsers"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_write_actions
    resources = ["*"]

    condition {
      test     = "StringLike"
      variable = "aws:userId"
      values   = local.saml_user_ids
    }
  }

  statement {
    sid    = "AllowReadRoleAndSAMLUsers"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_read_actions
    resources = ["*"]

    condition {
      test     = "StringLike"
      variable = "aws:userId"
      values   = local.role_and_saml_ids
    }
  }
}

# get the saml user info so we can get the unique_id
data "aws_iam_role" "saml_role" {
  name = var.saml_role
}

# resource policy doc that limits access to secret
data "aws_iam_policy_document" "sm_resource_policy_doc" {
  statement {
    sid    = "DenyWriteToAllExceptSAMLUsers"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.sm_write_actions
    resources = [local.sm_arn]

    condition {
      test     = "StringNotLike"
      variable = "aws:userId"
      values   = local.saml_user_ids
    }
  }

  statement {
    sid    = "DenyReadToAllExceptRoleAndSAMLUsers"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.sm_read_actions
    resources = [local.sm_arn]

    condition {
      test     = "StringNotLike"
      variable = "aws:userId"
      values   = local.role_and_saml_ids
    }
  }

  statement {
    sid    = "AllowWriteToSAMLUsers"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.sm_write_actions
    resources = [local.sm_arn]

    condition {
      test     = "StringLike"
      variable = "aws:userId"
      values   = local.saml_user_ids
    }
  }

  statement {
    sid    = "AllowReadRoleAndSAMLUsers"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.sm_read_actions
    resources = [local.sm_arn]

    condition {
      test     = "StringLike"
      variable = "aws:userId"
      values   = local.role_and_saml_ids
    }
  }
}

# get the saml user info so we can get the unique_id
data "aws_iam_role" "saml_role_ssm" {
  name = var.saml_role
}

data "aws_iam_policy_document" "ssm" {
  statement {
    sid    = "DenyWriteToAllExceptSAMLUsers"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_write_actions
    resources = ["*"]

    condition {
      test     = "StringNotLike"
      variable = "aws:userId"
      values   = local.saml_user_ids
    }
  }

  statement {
    sid    = "DenyReadToAllExceptRoleAndSAMLUsers"
    effect = "Deny"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_read_actions
    resources = ["*"]

    condition {
      test     = "StringNotLike"
      variable = "aws:userId"
      values   = local.role_and_saml_ids
    }
  }

  statement {
    sid    = "AllowWriteToSAMLUsers"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_write_actions
    resources = ["*"]

    condition {
      test     = "StringLike"
      variable = "aws:userId"
      values   = local.saml_user_ids
    }
  }

  statement {
    sid    = "AllowReadRoleAndSAMLUsers"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions   = local.kms_read_actions
    resources = ["*"]

    condition {
      test     = "StringLike"
      variable = "aws:userId"
      values   = local.role_and_saml_ids
    }
  }
}

data "aws_secretsmanager_secret_version" "env_vars_secret" {
  secret_id = aws_secretsmanager_secret.sm_secret.id
}