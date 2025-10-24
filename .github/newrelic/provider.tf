terraform {
  required_providers {
    newrelic = {
      source  = "newrelic/newrelic"
      version = "3.72.3"
    }
  }

  required_version = ">= 1.5.0"
}

provider "newrelic" {
  account_id = var.newrelic_account_id
  api_key    = var.newrelic_api_key
  region     = var.newrelic_region
}
