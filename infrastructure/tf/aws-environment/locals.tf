# Allow for code reuse...
locals {
  # KMS write actions
  kms_write_actions = [
    "kms:CancelKeyDeletion",
    "kms:CreateAlias",
    "kms:CreateGrant",
    "kms:CreateKey",
    "kms:DeleteAlias",
    "kms:DeleteImportedKeyMaterial",
    "kms:DisableKey",
    "kms:DisableKeyRotation",
    "kms:EnableKey",
    "kms:EnableKeyRotation",
    "kms:Encrypt",
    "kms:GenerateDataKey",
    "kms:GenerateDataKeyWithoutPlaintext",
    "kms:GenerateRandom",
    "kms:GetKeyPolicy",
    "kms:GetKeyRotationStatus",
    "kms:GetParametersForImport",
    "kms:ImportKeyMaterial",
    "kms:PutKeyPolicy",
    "kms:ReEncryptFrom",
    "kms:ReEncryptTo",
    "kms:RetireGrant",
    "kms:RevokeGrant",
    "kms:ScheduleKeyDeletion",
    "kms:TagResource",
    "kms:UntagResource",
    "kms:UpdateAlias",
    "kms:UpdateKeyDescription",
  ]

  # KMS read actions
  kms_read_actions = [
    "kms:Decrypt",
    "kms:DescribeKey",
    "kms:List*",
  ]

  # secretsmanager write actions
  sm_write_actions = [
    "secretsmanager:CancelRotateSecret",
    "secretsmanager:CreateSecret",
    "secretsmanager:DeleteSecret",
    "secretsmanager:PutSecretValue",
    "secretsmanager:RestoreSecret",
    "secretsmanager:RotateSecret",
    "secretsmanager:TagResource",
    "secretsmanager:UntagResource",
    "secretsmanager:UpdateSecret",
    "secretsmanager:UpdateSecretVersionStage",
  ]

  # secretsmanager read actions
  sm_read_actions = [
    "secretsmanager:DescribeSecret",
    "secretsmanager:List*",
    "secretsmanager:GetRandomPassword",
    "secretsmanager:GetSecretValue",
  ]

  # list of saml users for policies
  saml_user_ids = flatten([
    data.aws_caller_identity.current.user_id,
    data.aws_caller_identity.current.account_id,
    formatlist(
      "%s:%s",
      data.aws_iam_role.saml_role.unique_id,
      var.secrets_saml_users,
    ),
  ])

  # list of role users and saml users for policies
  role_and_saml_ids = flatten([
    "${aws_iam_role.app_role.unique_id}:*",
    "${aws_iam_role.ecsTaskExecutionRole.unique_id}:*",
    local.saml_user_ids,
  ])

  env_vars = jsondecode(data.aws_secretsmanager_secret_version.env_vars_secret.secret_string)

  sm_secret_string = {
    # REDIS_NODES = aws_elasticache_cluster.redis_session_store.cache_nodes
    MONGO_URI = mongodbatlas_cluster.api_cluster.srv_address
    MONGO_USER = var.mongo_master_user
    MONGO_PASS = var.mongo_master_password
  }

  sm_arn = "arn:aws:secretsmanager:${var.region}:${data.aws_caller_identity.current.account_id}:secret:${var.app}-${var.environment}-??????"
  secret_file = "${var.secret_dir}/${aws_secretsmanager_secret.sm_secret.name}"
  logs_group  = "/fargate/service/${var.app}-${var.environment}"
  private_subnets = [aws_subnet.subnet_private_1.id, aws_subnet.subnet_private_2.id]
  public_subnets = [aws_subnet.subnet_public_1.id, aws_subnet.subnet_public_2.id]
  all_subnets = [aws_subnet.subnet_private_1.id, aws_subnet.subnet_private_2.id, aws_subnet.subnet_public_1.id, aws_subnet.subnet_public_2.id]

  create_root_s3 = var.create_root_s3 == true ? 1 : 0
}
