#!/bin/bash
set -e

AWS_DEFAULT_REGION=us-east-2

echo "backing up running container configuration"
fargate task describe -t arn:aws:ecs:us-east-2:757944125934:task-definition/PROJECT_NAME-api-development:27 > backup.yml

echo "deploying new sidecar configuration"
fargate service deploy -r 25

echo "re-deploying app configuration"
fargate service deploy -f backup.yml
fargate service env set -e SECRET=/var/secret/PROJECT_NAME-api-development-secret-MFLbJmhH
