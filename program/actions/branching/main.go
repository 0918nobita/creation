package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	files := os.Getenv("INPUT_FILES")
	changedFiles := changedFilesFromJson(files)

	isAppChanged := changedFiles.containsDir("program/nextjs")
	fmt.Printf("::set-output name=is_app_changed::%t\n", isAppChanged)

	isServiceChanged := changedFiles.containsDir("program/backup-service")
	fmt.Printf("::set-output name=is_service_changed::%t\n", isServiceChanged)

	isInfraChanged := changedFiles.containsDir("program/infra")
	fmt.Printf("::set-output name=is_infra_changed::%t\n", isInfraChanged)

	isActionChanged := changedFiles.containsDir("program/actions")
	fmt.Printf("::set-output name=is_action_changed::%t\n", isActionChanged)
}

type ChangedFiles []string

func changedFilesFromJson(filesJson string) ChangedFiles {
	var changedFiles ChangedFiles
	err := json.Unmarshal([]byte(filesJson), &changedFiles)
	if err != nil {
		log.Fatal(err)
		panic("Failed to parse JSON")
	}
	return changedFiles
}

func (files ChangedFiles) containsDir(dirname string) bool {
	return some(files, func(line string) bool {
		return strings.HasPrefix(line, dirname)
	})
}

func some(s []string, predicate func(string) bool) bool {
	for _, v := range s {
		if predicate(v) {
			return true
		}
	}
	return false
}
