# This Route53 record will point at the CloudFront distribution.
# resource "aws_route53_record" "root" {
#   zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
#   name    = var.root_domain_name
#   type    = "A"

#   lifecycle {
#       ignore_changes = all
#       prevent_destroy = true
#   }

#   alias {
#     name                   = aws_s3_bucket.site_root.website_domain
#     zone_id                = aws_s3_bucket.site_root.hosted_zone_id
#     evaluate_target_health = true
#   }
# }

# This Route53 record will point at the CloudFront distribution.
resource "aws_route53_record" "site" {
  zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
  name    = var.site_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.site_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

# This Route53 record will point at the backoffice CloudFront distribution.
resource "aws_route53_record" "backoffice" {
  zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
  name    = var.backoffice_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.backoffice_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.backoffice_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

# This Route53 record will point at the kabinett CloudFront distribution.
resource "aws_route53_record" "kabinett" {
  zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
  name    = var.kabinett_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.kabinett_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.kabinett_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

# This Route53 record will point at the ALB of the API deployed on Fargate.
resource "aws_route53_record" "api" {
  zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
  name    = var.api_domain_name
  type    = "A"

  alias {
    name                   = aws_alb.main.dns_name
    zone_id                = aws_alb.main.zone_id
    evaluate_target_health = true
  }
}
