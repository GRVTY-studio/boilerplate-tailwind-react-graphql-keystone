# the S3 bucket used to store the terraform state file

resource "aws_s3_bucket" "private_assets" {
  bucket  = "${var.app}-api-private-assets-${var.environment}"
  acl     = "private"

  tags    = var.tags

  versioning {
    enabled     = false
  }
}

resource "aws_s3_bucket_public_access_block" "private_assets_public_access" {
  bucket = aws_s3_bucket.private_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}