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
	fmt.Println(empty) // {}

	// フィールドを3つ持つ構造体
	var point struct {
		ID string
		x, y int
	}
	// フィールドの更新
	point.ID = "P"
	point.x = 120
	point.y = 300
	fmt.Println(point) // {P 120 300}

	// ゼロ値で初期化された配列
	var arr [5]int
	arr[1] = 2
	fmt.Println(arr) // [0 2 0 0 0]

	// 指定した5つの要素を持つ配列
	arrLit := [5]int{1, 2, 3, 4, 5}
	fmt.Println(arrLit) // [1 2 3 4 5]

	// 要素数を推論させる
	arrLitInfer := [...]int{10, 20, 30}
	fmt.Println(arrLitInfer) // [10 20 30]

	// 配列のインデックスと値を指定
	// インデックスの指定がない箇所はゼロ値
	arrIndex := [...]int{2: 1, 5: 5, 7: 13}
	fmt.Println(arrIndex) // [0 0 1 0 0 5 0 13]

	// スライスを作成し、長さと容量を取得する
	slice := []int{1, 2, 3, 4}
	fmt.Println(slice, "len:", len(slice), "cap:", cap(slice)) // [1 2 3 4] len: 4 cap: 4
	// スライスに要素を追加する
	slice = append(slice, 5)
	fmt.Println(slice, "len:", len(slice), "cap:", cap(slice)) // [1 2 3 4 5] len: 5 cap: 8

	// make 関数でスライスを初期化する
	slice = make([]int, 2, 3)
	fmt.Println(slice, "len:", len(slice), "cap:", cap(slice)) // [0 0] len: 2 cap: 3
	// インデックスと値を指定してスライスを初期化する
	slice = []int{2: 1, 5: 5, 7: 13}
	fmt.Println(slice) // [0 0 1 0 0 5 0 13]

	// copy 関数でスライスを複製する
	sliceA := []int{1, 2, 3, 4, 5}
	sliceB := make([]int, len(sliceA))
	copy(sliceB, sliceA)
	fmt.Println(sliceB) // [1 2 3 4 5]

	// append 関数でスライス同士を連結する
	sliceA, sliceB = []int{6, 7}, []int{8, 9, 10}
	sliceC := append(sliceA, sliceB...)
	fmt.Println(sliceA, sliceB, sliceC) // [6 7] [8 9 10] [6 7 8 9 10]

	// スライス内の要素を削除する
	sliceA = []int{11, 12, 13, 14, 15}
	sliceB = removeElement(sliceA, 2)
	fmt.Println(sliceA, sliceB) // [11 12 13 14 15] [11 12 14 15]

	// スライスを逆順に並び替える
	sliceB = reverseSlice(sliceA)
	fmt.Println(sliceA, sliceB) // [11 12 13 14 15] [15 14 13 12 11]

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

func removeElement(ns []int, i int) []int {
	length := len(ns)
	if length == 0 {
		panic("Specified slice is empty")
	}
	dst := make([]int, length-1)
	copy(dst, ns[:i])
	copy(dst[i:], ns[i:])
	return dst
}

func reverseSlice(ns []int) []int {
	length := len(ns)
	dst := make([]int, length)
	for i, v := range ns {
		dst[length - i - 1] = v
	}
	return dst
}
