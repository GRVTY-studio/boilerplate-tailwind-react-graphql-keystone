# IAM "developers" group permissions
data "aws_iam_policy_document" "developers" {
  statement {
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchDeleteImage",
      "ecr:BatchGetImage",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeImageScanFindings",
      "ecr:DescribeImages",
      "ecr:DescribeRepositories",
      "ecr:GetAuthorizationToken",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetLifecyclePolicy",
      "ecr:GetLifecyclePolicyPreview",
      "ecr:InitiateLayerUpload",
      "ecr:ListImages",
      "ecr:ListTagsForResource",
      "ecr:PutImage",
      "ecr:StartImageScan",
      "ecr:StartLifecyclePolicyPreview",
      "ecr:TagResource",
      "ecr:UntagResource",
      "ecr:UploadLayerPart",
      "ecs:*",
      "cloudwatch:*",
      "logs:*",
      "s3:*",
    ]

    resources = [
      "*",
    ]

    effect = "Allow"
  }

  statement {
    actions = [
      "*"
    ]

    resources = [
      aws_s3_bucket.terraform_state.arn,
    ]

    effect = "Deny"
  }
}
