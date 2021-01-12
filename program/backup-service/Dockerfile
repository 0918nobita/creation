FROM golang:alpine

RUN apk update && apk add --no-cache git=2.26.2-r0

WORKDIR $GOPATH/src

COPY . .

RUN go get -d -v

RUN go build -o /go/bin/backup-service

ENTRYPOINT ["/go/bin/backup-service"]
