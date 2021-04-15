# adds an https listener to the load balancer
# (delete this file if you only want http)

resource "aws_alb_listener" "https" {
  load_balancer_arn = aws_alb.main.id
  port              = var.https_port
  protocol          = "HTTPS"
  # certificate_arn   = var.certificate_arn
  certificate_arn   = aws_acm_certificate.root.arn

  default_action {
    target_group_arn = aws_alb_target_group.main.id
    type             = "forward"
  }
  
  depends_on = [aws_acm_certificate_validation.root_certificate_validation]
}

resource "aws_security_group_rule" "ingress_lb_https" {
  type              = "ingress"
  description       = "HTTPS"
  from_port         = var.https_port
  to_port           = var.https_port
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.nsg_lb.id
}
