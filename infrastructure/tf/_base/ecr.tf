#
# ECR
#

#
# Repository for the API
#

# create an ECR repo at the app/image level
resource "aws_ecr_repository" "api" {
  name                 = "PROJECT_NAME-api"
  image_tag_mutability = var.image_tag_mutability
}

# grant access to developers
resource "aws_ecr_repository_policy" "api" {
  repository = aws_ecr_repository.api.name
  policy     = data.aws_iam_policy_document.ecr.json
}

#
# Repository for the Jobs
#

# create an ECR repo at the app/image level
resource "aws_ecr_repository" "jobs" {
  name                 = "PROJECT_NAME-jobs"
  image_tag_mutability = var.image_tag_mutability
}

# grant access to developers
resource "aws_ecr_repository_policy" "jobs" {
  repository = aws_ecr_repository.jobs.name
  policy     = data.aws_iam_policy_document.ecr.json
}

####
