# The developers user group
resource "aws_iam_group" "developers" {
  name          = "developers"
  path          = "/"

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    # prevent_destroy = true
  }
}

# Create the developer users
resource "aws_iam_user" "developer" {
  count         = length(var.developers)
  name          = element(var.developers,count.index)
  path          = "/"
}

# Add the developer users to the group
resource "aws_iam_group_membership" "development_team" {
  name          = "development-team"
  users         = var.developers
  group         = aws_iam_group.developers.name
}

# Create a login profile for the users in
# order to have access to AWS web console
resource "aws_iam_user_login_profile" "developer" {
  count         = length(var.developers)
  user          = element(var.developers,count.index)
  # Mandatory argument
  pgp_key       = file("${path.module}/inc/user_pgp.pub")

  # Ignore changes made to the user
  lifecycle {
    ignore_changes = [
      password_length,
      password_reset_required,
      pgp_key
    ]
  }

  depends_on = [aws_iam_user.developer]
}

resource "aws_iam_policy" "developers_policy" {
  name        = "DevelopersPolicy"
  description = "A policy created for the software developers"
  policy      = data.aws_iam_policy_document.developers.json

  # Ignore all changes
  lifecycle {
    // ignore_changes = all
    prevent_destroy = true
  }
}

resource "aws_iam_group_policy_attachment" "developers_policy_attachment" {
  group      = aws_iam_group.developers.name
  policy_arn = aws_iam_policy.developers_policy.arn

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}

# User and group dedicated to Terraform
# MUST be declared in order for terraform
# to account for it and not delete it
# DO NOT DELETE ANYTHING BELOW THIS LINE!

# The devops group
resource "aws_iam_group" "terraform" {
  name          = "devops"

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}

# Create the terraform user
resource "aws_iam_user" "terraform" {
  name          = "terraform"

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}

resource "aws_iam_user_group_membership" "terraform" {
  user = aws_iam_user.terraform.name

  groups = [
    aws_iam_group.terraform.name,
  ]

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}

resource "aws_iam_role" "developer" {
  name = "developer"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}