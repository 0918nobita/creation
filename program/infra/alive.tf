resource "google_cloud_run_service" "default" {
  name     = "alive"
  location = "asia-northeast1"

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"  = "1000"
        "client.knative.dev/user-image"     = "gcr.io/alive-301110/cloudrun/alive:latest"
        "run.googleapis.com/client-name"    = "gcloud"
        "run.googleapis.com/client-version" = "323.0.0"
      }
      labels = {}
    }
    spec {
      service_account_name = "725724983678-compute@developer.gserviceaccount.com"
      containers {
        image = "gcr.io/alive-301110/cloudrun/alive:latest"
        ports {
          container_port = 3000
        }
      }
    }
  }
}

resource "google_cloud_run_service_iam_policy" "alive_noauth" {
  location = google_cloud_run_service.default.location
  project  = google_cloud_run_service.default.project
  service  = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
