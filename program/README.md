# プログラム

２つのプロジェクトに分かれています

- `functions/` : Cloud Functions にデプロイされる各関数の定義
- `nextjs/` : Vercel にデプロイされる Next.js アプリケーション

## 必要なツール

- Firebase CLI

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
