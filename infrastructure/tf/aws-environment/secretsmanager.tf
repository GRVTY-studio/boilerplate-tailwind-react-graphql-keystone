# create the KMS key for this secret
resource "aws_kms_key" "sm_kms_key" {
  description = "sm parameters key for ${var.app}-${var.environment}"
  policy      = data.aws_iam_policy_document.kms_resource_policy_doc.json
  deletion_window_in_days = 7
  tags = merge(
    var.tags,
    {
      "Name" = format("%s-%s", var.app, var.environment)
    },
  )
}

# alias for the key
resource "aws_kms_alias" "sm_kms_alias" {
  name          = "alias/sm-${var.app}-${var.environment}"
  target_key_id = aws_kms_key.sm_kms_key.key_id
}

# create the secretsmanager secret
resource "aws_secretsmanager_secret" "sm_secret" {
  name       = "${var.app}-${var.environment}-secret-${random_string.sm_id.result}"
  kms_key_id = aws_kms_key.sm_kms_key.key_id
  tags       = var.tags
  policy     = data.aws_iam_policy_document.sm_resource_policy_doc.json
}

# create the placeholder secret json
resource "aws_secretsmanager_secret_version" "initial" {
  secret_id     = aws_secretsmanager_secret.sm_secret.id
  secret_string = jsonencode(local.sm_secret_string)
}
