resource "aws_acm_certificate" "root" {
  domain_name       = "*.${var.root_domain_name}"
  validation_method = "DNS"

  tags = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "root_validation" {
  name    = tolist(aws_acm_certificate.root.domain_validation_options).0.resource_record_name
  type    = tolist(aws_acm_certificate.root.domain_validation_options).0.resource_record_type
  zone_id = data.terraform_remote_state.prerequisites.outputs.domains[var.root_domain_name]
  records = [tolist(aws_acm_certificate.root.domain_validation_options).0.resource_record_value]
  ttl     = var.dns_record_ttl
}

resource "aws_acm_certificate_validation" "root_certificate_validation" {
  certificate_arn = aws_acm_certificate.root.arn
  validation_record_fqdns = [
    aws_route53_record.root_validation.fqdn,
  ]
}

# Separate certificates for CloudFront due to AWS constraints
# AWS Issued certificates can be used by CloudFront only if
# the certificates are in ACM in the us-east-1 region
# Otherwise an error occurs. Details in the link below
# https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-invalid-viewer-certificate/
resource "aws_acm_certificate" "cf_root" {
  # The certificate needs to be created in the us-east-1 region
  # in order to be used by CloudFront
  # Details here: https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-invalid-viewer-certificate/
  provider                    = aws.useast1 # AWS provider configured for us-east-1 region
  domain_name                 = var.root_domain_name
  subject_alternative_names   = ["*.${var.root_domain_name}"]
  validation_method           = "DNS"

  tags = var.tags

  lifecycle {
      create_before_destroy = true
  }
}
