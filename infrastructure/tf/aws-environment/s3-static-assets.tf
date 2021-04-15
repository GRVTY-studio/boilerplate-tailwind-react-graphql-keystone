resource "aws_s3_bucket" "static_assets" {
  bucket = "${var.app}-${var.environment}-assets"
  acl    = "public-read"
  # We need to create a policy that allows anyone to view the content.
  # This is basically duplicating what we did in the ACL but it's required by
  # AWS. This post: http://amzn.to/2Fa04ul explains why.
  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"AddPerm",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.app}-${var.environment}-assets/*"]
    }
  ]
}
POLICY

  # S3 understands what it means to host a website.
  website {
    # Here we tell S3 what to use when a request comes in to the root
    # ex. https://www.example.io
    index_document = "index.html"
    # The page to serve up if a request results in an error or a non-existing
    # page.
    error_document = "404.html"
  }
}