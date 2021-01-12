package main

import (
	// "context"
	"io"
	"log"
	"net/http"
	"os"
	// firebase "firebase.google.com/go"
	// "google.golang.org/api/option"
)

func main() {
    /*
    // FIXME: Use Secret Manager
    opt := option.WithCredentialsJSON([]byte(os.Getenv("FIREBASE_SA_KEY")))

    app, err := firebase.NewApp(context.Background(), nil, opt)
    if err != nil {
        log.Fatal("Error initializing app: %V", err)
    }

    _, err = app.Auth(context.Background())
    if err != nil {
        log.Fatal("Error getting Auth client: %V", err)
    }
    */

    log.Print("Starting server ...")
	http.HandleFunc("/", handler)

    port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

    log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
		log.Fatal(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")

    _, err := io.WriteString(w, "{ \"message\": \"Hello, world!\" }")
    if err != nil {
        http.Error(w, "Failed to write response", http.StatusInternalServerError)
    }
}
