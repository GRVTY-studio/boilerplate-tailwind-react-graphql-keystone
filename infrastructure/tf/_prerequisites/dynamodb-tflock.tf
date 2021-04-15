resource "aws_dynamodb_table" "terraform" {
  name           = "terraform"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    ManagedBy       = "Terraform"
    Environment     = "prerequisites"
  }

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}