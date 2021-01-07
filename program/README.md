# プログラム本体

[Next.js](https://nextjs.org/) アプリケーションとして開発し、[Vercel](https://vercel.com/home) にデプロイしています。

## セットアップ

```bash
yarn
```

`.env.local` ファイルを作成し、firebase に関する情報を以下のように記入してください。

```ini
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
```

## 起動方法

```bash
yarn dev
```

## ビルド方法

```bash
yarn build
```

## Firebase Local Emulator Suite を使用して動作確認する

```bash
firebase emulators:start
```

```bash
USE_EMULATORS=true yarn dev
```

## ライセンス一覧を生成する

```bash
yarn generate-licenses
```
