output "domains" {
    value = {
        "PROJECT_NAME.TOP_LEVEL_DOMAIN" = aws_route53_zone.PROJECT_NAME_us.zone_id
    }
}