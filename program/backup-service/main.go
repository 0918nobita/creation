package main

import (
	// "context"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	// firebase "firebase.google.com/go"
	// "google.golang.org/api/option"
)

func main() {
	// フィールドを持たない構造体
	var empty struct {}
	fmt.Println(empty)

	// フィールドを3つ持つ構造体
	var point struct {
		ID string
		x, y int
	}
	// フィールドの更新
	point.ID = "P"
	point.x = 120
	point.y = 300
	fmt.Println(point)

	// ゼロ値で初期化された配列
	var arr [5]int
	arr[1] = 2
	fmt.Println(arr)

	// 指定した5つの要素を持つ配列
	arrLit := [5]int{1, 2, 3, 4, 5}
	fmt.Println(arrLit)

	// 要素数を推論させる
	arrLitInfer := [...]int{10, 20, 30}
	fmt.Println(arrLitInfer)

	// 配列のインデックスと値を指定
	// インデックスの指定がない箇所はゼロ値
	arrIndex := [...]int{2: 1, 5: 5, 7: 13}
	fmt.Println(arrIndex)

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
