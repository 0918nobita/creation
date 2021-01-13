FROM golang:alpine

RUN apk add --update --no-cache git=2.26.2-r0

WORKDIR $GOPATH/src

COPY . .

RUN go get -d -v

RUN go build -o /bin/action

ENTRYPOINT ["/bin/action"]
