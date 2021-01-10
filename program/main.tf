variable "gcpProjectId" {}

provider "google" {
  project = (var.gcpProjectId)
}

resource google_cloud_run_service default {
  name = "alive"
  location = "asia-northeast1"

  template {
    spec {
      service_account_name = "725724983678-compute@developer.gserviceaccount.com"
      containers {
        image = "gcr.io/alive-301110/cloudrun/alive:latest"
        ports {
          container_port = 3000
        }
      }
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"  = "100"
        "client.knative.dev/user-image"     = "asia.gcr.io/alive-301110/creation/alive:30e2673227310e5e58c6b5fd6e1f7ab90a8e6d6d"
        "run.googleapis.com/client-name"    = "gcloud"
        "run.googleapis.com/client-version" = "322.0.0"
      }
      labels = {
        "commit-sha"     = "30e2673227310e5e58c6b5fd6e1f7ab90a8e6d6d"
        "gcb-build-id"   = "5ad35c11-c73f-42f1-9051-38f670dee8e4"
        "gcb-trigger-id" = "a6f7a4f5-da11-4790-9d0e-b82ef2f955e5"
        "managed-by"     = "gcp-cloud-build-deploy-cloud-run"
      }
    }
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.default.location
  project     = google_cloud_run_service.default.project
  service     = google_cloud_run_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
