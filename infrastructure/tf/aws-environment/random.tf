resource "random_string" "sm_id" {
  length = 8
  special = false
  number = false
}

resource "random_string" "cookie_secret" {
  length = 32
  special = false
  number = true
}
