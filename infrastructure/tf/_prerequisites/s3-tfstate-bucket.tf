# the S3 bucket used to store the terraform state file

resource "aws_s3_bucket" "terraform_state" {
  bucket  = "PROJECT_NAME-infra"
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
    # ignore_changes = all
    # prevent_destroy = true
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state_public_access" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}