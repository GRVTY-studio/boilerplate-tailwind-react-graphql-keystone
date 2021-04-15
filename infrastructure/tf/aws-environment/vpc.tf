# The VPC
resource "aws_vpc" "vpc" {
    cidr_block = "10.10.0.0/16"
    enable_dns_support = true # gives you an internal domain name
    enable_dns_hostnames = true # gives you an internal host name
    instance_tenancy = "default"
    tags = var.tags
}

# The first public subnet
resource "aws_subnet" "subnet_public_1" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.10.1.0/24"
    map_public_ip_on_launch = true # it makes this a public subnet
    availability_zone = "us-east-2a"
    tags = var.tags
}

# The second public subnet
resource "aws_subnet" "subnet_public_2" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.10.2.0/24"
    map_public_ip_on_launch = true # it makes this a public subnet
    availability_zone = "us-east-2c"
    tags = var.tags
}

# The first private subnet
resource "aws_subnet" "subnet_private_1" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.10.3.0/24"
    map_public_ip_on_launch = false # it makes this a private subnet
    availability_zone = "us-east-2a"
    tags = var.tags
}

# The second private subnet
resource "aws_subnet" "subnet_private_2" {
    vpc_id = aws_vpc.vpc.id
    cidr_block = "10.10.4.0/24"
    map_public_ip_on_launch = false # it makes this a private subnet
    availability_zone = "us-east-2c"
    tags = var.tags
}

# The internet gateway for the VPC
resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.vpc.id
    tags = var.tags
}

# The public routing table
resource "aws_route_table" "public_rt" {
    vpc_id = aws_vpc.vpc.id

    tags = var.tags
}

# Public subnets routing through the internet gateway
resource "aws_route" "public_igw" {
    route_table_id            = aws_route_table.public_rt.id
    # associated subnet can reach everywhere
    destination_cidr_block    = "0.0.0.0/0"
    # RT uses this IGW to reach internet
    gateway_id                = aws_internet_gateway.igw.id
}

# Route to MongoDB Atlas peering
resource "aws_route" "public_subnet_mongodb_peer" {
    route_table_id            = aws_route_table.public_rt.id
    # MongoDB Atlas subnet
    destination_cidr_block    = mongodbatlas_network_container.api_cluster_container.atlas_cidr_block
    # Peering connection ID as gateway
    vpc_peering_connection_id = mongodbatlas_network_peering.api_cluster_peering.connection_id
    depends_on                = [mongodbatlas_network_peering.api_cluster_peering]
}

# Public subnets to route table association
resource "aws_route_table_association" "public_subnet_1"{
    subnet_id = aws_subnet.subnet_public_1.id
    route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_subnet_2"{
    subnet_id = aws_subnet.subnet_public_2.id
    route_table_id = aws_route_table.public_rt.id
}

# Elastic IP for the NAT Gateway
resource "aws_eip" "nat" {
  vpc              = true
  tags             = var.tags
}

# NAT gateway for the private subnets
resource "aws_nat_gateway" "ngw" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.subnet_private_1.id
  tags          = var.tags
}

# The private routing table
resource "aws_route_table" "private_rt" {
    vpc_id = aws_vpc.vpc.id

    tags = var.tags

    # lifecycle {
    #     ignore_changes = [route]
    # }
}

# Private subnets routing through the NAT gateway
resource "aws_route" "private_ngw" {
    route_table_id            = aws_route_table.private_rt.id
    # associated subnet can reach everywhere
    destination_cidr_block    = "0.0.0.0/0"
    # RT uses this NGW to reach internet
    nat_gateway_id                = aws_nat_gateway.ngw.id
}

# Private subnets to route table association
resource "aws_route_table_association" "private_subnet_1"{
    subnet_id = aws_subnet.subnet_private_1.id
    route_table_id = aws_route_table.private_rt.id
}

resource "aws_route_table_association" "private_subnet_2"{
    subnet_id = aws_subnet.subnet_private_2.id
    route_table_id = aws_route_table.private_rt.id
}
