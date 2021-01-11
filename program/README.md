# プログラム

２つのプロジェクトに分かれています

- `functions/` : Firebase Cloud Functions にデプロイされる各関数の定義
- `nextjs/` : Docker イメージに含まれ GCP Cloud Run にデプロイされる Next.js アプリケーション

## 必要なツール

- Docker
- Firebase CLI
- Google Cloud SDK
- Terraform

## ローカルで動作確認をする

### Firebase Local Emulator Suite を起動する

```bash
firebase emulators:start
```

### Next.js アプリの開発用サーバを起動する

```bash
cd nextjs
# Next.js アプリのセットアップを済ませておく
USE_EMULATORS=true yarn dev
```

[Next.js アプリのセットアップ](./nextjs/README.md)

## Cloud Functions に各関数をデプロイする

```bash
firebase deploy --only functions
```

## Google Cloud SDK のセットアップ

```bash
gcloud init
gcloud config set project ${PROJECT_NAME}
gcloud auth configure-docker # 後で docker push するために必要
```

## Cloud Run に Next.js アプリをデプロイする

以下のような手順でデプロイを行います

- Next.js アプリをビルドする
- Docker イメージをビルドする
- Docker イメージを GCP Container Registry に push する
- Cloud Run にデプロイする

### Docker イメージをビルドする

```bash
cd nextjs
docker build -t alive:latest .
```

### Docker イメージを GCP Container Registry に push する

```bash
docker tag alive gcr.io/${PROJECT_NAME}/cloudrun/alive:latest
docker push gcr.io/${PROJECT_NAME}/cloudrun/alive:latest
```

### Cloud Run にデプロイする

```bash
gcloud beta run deploy --project ${PROJECT_NAME} --platform managed --allow-unauthenticated --image gcr.io/${PROJECT_NAME}/cloudrun/alive:latest
```

## Cloud Run の設定を編集する

Cloud Run の設定を Terraform で管理しています。 `main.tf` を編集し `terraform plan` コマンドを呼び出すことで設定の差分が事前チェックでき、 `terraform apply` コマンドを呼び出すことで変更を実際の環境に適用できます。

差分の事前チェックと適用には GCP サービスアカウントの秘密鍵ファイル (JSON形式) が必要です。
↓のコマンドで取得できます。

```bash
gcloud auth application-default login
```

保存先パスが出力されるので、それを環境変数 `GOOGLE_APPLICATION_CREDENTIALS` に代入した状態で `terraform` コマンドを呼び出すようにしてください。

参考：[Getting Started with the Google Provider | Terraform Registry](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/getting_started)

`.zshrc` の設定例：

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/home/username/.config/gcloud/application_default_credentials.json
```
