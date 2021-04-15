# the S3 bucket used to transfer data inbetween environments

resource "aws_s3_bucket" "mongo_data_migration" {
  bucket  = "PROJECT_NAME-mongo-data-migration"
  acl     = "private"

  tags    = {
    Environment = "Base"
    ManagedBy   = "Terraform"
  }

  versioning {
    enabled     = true
  }

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_public_access_block" "mongo_data_migration_public_access" {
  bucket = aws_s3_bucket.mongo_data_migration.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}