resource "newrelic_one_dashboard" "example" {
  name       = "Terraform Local Demo Dashboard"
  permissions = "public_read_write"

  page {
    name = "Overview"

    widget_billboard {
      title = "Avg Duration"
      nrql_query {
        query = "SELECT average(duration) FROM Transaction TIMESERIES"
      }
      column = 1
      row    = 1
      width  = 3
      height = 3
    }

    widget_billboard {
      title = "Apdex Score"
      nrql_query {
        query = "SELECT apdex(duration, t: 0.5) FROM Transaction WHERE appName = 'ecommerce-app'"
      }
      column = 4
      row    = 1
      width  = 3
      height = 3
    }

    widget_billboard {
      title = "Error Rate (%)"
      nrql_query {
        query = "SELECT percentage(count(*), WHERE error IS TRUE) FROM Transaction WHERE appName = 'ecommerce-app'"
      }
      column = 7
      row    = 1
      width  = 3
      height = 3
    }

    # 2️⃣ User Activity
    widget_line {
      title = "Transactions per Minute"
      nrql_query {
        query = "SELECT count(*) FROM Transaction WHERE appName = 'ecommerce-app' TIMESERIES 1 minute"
      }
      column = 1
      row    = 4
      width  = 6
      height = 4
    }

    widget_line {
      title = "Unique Users (Sessions)"
      nrql_query {
        query = "SELECT uniqueCount(session) FROM PageView WHERE appName = 'ecommerce-app' TIMESERIES 5 minutes"
      }
      column = 7
      row    = 4
      width  = 6
      height = 4
    }

    # 3️⃣ Frontend Performance
    widget_line {
      title = "Page Load Time (ms)"
      nrql_query {
        query = "SELECT average(duration) * 1000 FROM PageView WHERE appName = 'ecommerce-app' TIMESERIES"
      }
      column = 1
      row    = 9
      width  = 6
      height = 4
    }

    widget_line {
      title = "JS Errors per Minute"
      nrql_query {
        query = "SELECT count(*) FROM JavaScriptError WHERE appName = 'ecommerce-app' TIMESERIES"
      }
      column = 7
      row    = 9
      width  = 6
      height = 4
    }

    # 4️⃣ Sales / Conversions
    widget_billboard {
      title = "Completed Orders (Last 24h)"
      nrql_query {
        query = "SELECT count(*) FROM Transaction WHERE name LIKE '%Order%' AND appName = 'ecommerce-app' SINCE 24 hours ago"
      }
      column = 1
      row    = 14
      width  = 3
      height = 3
    }

    widget_billboard {
      title = "Avg Order Value ($)"
      nrql_query {
        query = "SELECT average(amount) FROM Transaction WHERE name LIKE '%Order%' AND appName = 'ecommerce-app' SINCE 24 hours ago"
      }
      column = 4
      row    = 14
      width  = 3
      height = 3
    }

    widget_billboard {
      title = "Cart Abandon Rate (%)"
      nrql_query {
        query = "SELECT percentage(count(*), WHERE name LIKE '%AddToCart%' AND success IS FALSE) FROM Transaction WHERE appName = 'ecommerce-app' SINCE 24 hours ago"
      }
      column = 7
      row    = 14
      width  = 3
      height = 3
    }
    
  }
}
