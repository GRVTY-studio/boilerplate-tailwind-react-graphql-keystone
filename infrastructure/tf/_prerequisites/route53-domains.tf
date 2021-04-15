resource "aws_route53_zone" "PROJECT_NAME_us" {
  name = var.domains["PROJECT_NAME_us"]
  comment = "HostedZone created by Route53 Registrar (managed by Terraform)"

  # Ignore all changes
  lifecycle {
    ignore_changes = all
    prevent_destroy = true
  }
}