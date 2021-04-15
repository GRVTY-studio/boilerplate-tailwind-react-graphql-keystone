# kms key used to encrypt ssm parameters
resource "aws_kms_key" "ssm" {
  description             = "ssm parameters key for ${var.app}-${var.environment}"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  tags                    = var.tags
  policy                  = data.aws_iam_policy_document.ssm.json
}

resource "aws_kms_alias" "ssm" {
  name          = "alias/ssm-${var.app}-${var.environment}"
  target_key_id = aws_kms_key.ssm.id
}

# allow ecs task execution role to read this app's parameters
resource "aws_iam_policy" "ecsTaskExecutionRole_ssm" {
  name        = "${var.app}-${var.environment}-ecs-ssm"
  path        = "/"
  description = "allow ecs task execution role to read this app's parameters"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters"
      ],
      "Resource": "arn:aws:ssm:${var.region}:${data.aws_caller_identity.current.account_id}:parameter/${var.app}/${var.environment}/*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_ssm" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = aws_iam_policy.ecsTaskExecutionRole_ssm.arn
}