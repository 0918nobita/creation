resource "google_cloud_run_service" "backup_service" {
  name     = "alive-backup-service"
  location = "asia-northeast1"
  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"  = "1000"
        "client.knative.dev/user-image"     = "asia.gcr.io/alive-301110/cloudrun/alive-backup-service:latest"
        "run.googleapis.com/client-name"    = "gcloud"
        "run.googleapis.com/client-version" = "323.0.0"
      }
      labels = {}
    }
    spec {
      container_concurrency = 80
      service_account_name  = "725724983678-compute@developer.gserviceaccount.com"
      timeout_seconds       = 300
      containers {
        image = "asia.gcr.io/alive-301110/cloudrun/alive-backup-service:latest"
        ports {
          container_port = 8080
        }
      }
    }
  }
}

resource "google_cloud_run_service_iam_policy" "alive_backup_service_noauth" {
  location = google_cloud_run_service.backup_service.location
  project  = google_cloud_run_service.backup_service.project
  service  = google_cloud_run_service.backup_service.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
