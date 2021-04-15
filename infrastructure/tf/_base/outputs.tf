#
# Outputs Configuration
#

output "api_docker_ecr" {
    value = aws_ecr_repository.api
}

output "jobs_docker_ecr" {
    value = aws_ecr_repository.jobs
}