# Three.js + React + VRM Sample App

React SPA + TypeScriptで作った、ブラウザ上でVRMアバターを表示・操作するサンプルアプリです。

## セットアップ

```bash
pnpm install
```

## 起動

```bash
pnpm dev
```

Viteの開発サーバーが起動したら、表示されたURLをブラウザで開いてください。

## ビルド

```bash
pnpm build
```

## GitHub Pagesで公開

`main` ブランチへpushすると、GitHub Actionsが `pnpm build` を実行して `dist` をGitHub Pagesへデプロイします。

Viteの `base` はGitHub Actions上ではリポジトリ名から自動で `/<repo-name>/` に設定されます。ローカル開発では `/` のまま動きます。

GitHub Pagesの公開ビルドでは、VRMファイルをPages成果物へ同梱せず、GitHub raw URLから読み込みます。ローカル開発では `public/avatar.vrm` を読み込みます。

## VRMファイルの配置

アプリは `public/avatar.vrm` を読み込みます。

現在のサンプルには、`madjin/vrm-samples` の `vroid/stable/AvatarSample_C.vrm` を配置しています。AvatarSample_A・B・CはCC0ではなく、VRoid Studioサンプルモデルの利用条件に従って利用してください。

任意のVRMモデルに差し替える場合は、VRMファイルを以下のパスに配置してください。

```txt
public/avatar.vrm
```

ファイル名や配置場所を変える場合は、`src/shared/config/avatar.ts` の `AVATAR_MODEL_URL` を変更します。

## 使用ライブラリ

- Vite
- React
- TypeScript
- pnpm
- Three.js
- @react-three/fiber
- @react-three/drei
- @pixiv/three-vrm

## ディレクトリ構成

```txt
src/
  app/
    providers/
    styles/
    main.tsx
  pages/
    avatar-page/
      ui/
        avatar-page.tsx
  widgets/
    avatar-viewer/
      ui/
        avatar-viewer.tsx
  features/
    change-expression/
      ui/
        expression-controls.tsx
    change-animation/
      ui/
        animation-controls.tsx
    reset-avatar/
      ui/
        reset-avatar-button.tsx
  entities/
    avatar/
      model/
        avatar-types.ts
      lib/
        bones.ts
        expression.ts
      ui/
        vrm-avatar.tsx
  shared/
    ui/
      button.tsx
    lib/
      class-names.ts
    config/
      avatar.ts
```

## Feature-Sliced Design上の責務分離

- `app`: Reactのエントリーポイント、グローバルスタイル、アプリ全体のProvider置き場
- `pages`: ページ単位の構成。今回はアバター操作画面全体を管理
- `widgets`: ページ内の大きなUIブロック。今回は3Dビューア
- `features`: 表情変更、アニメーション変更、リセットなどユーザー操作ごとのUI
- `entities`: VRMアバターの型、ボーン操作、表情反映、Three.js連携
- `shared`: 汎用UI、共通関数、設定値

Three.jsとVRMに直接触る処理は、主に `entities/avatar` に閉じ込めています。

## 実装済みの操作

- VRMモデル表示
- OrbitControlsによる回転、ズーム、パン
- 表情変更: Neutral / Happy / Angry / Sad / Surprised
- アニメーション切り替え: Idle / Wave
- マウスカーソルに合わせた顔と視線の追従
- リセット
- PC / タブレット向けのレスポンシブレイアウト

## 今後追加しやすい機能

- 音声入力
- 音声合成
- リップシンク
- ChatGPT等との連携
- アニメーション追加
- VRM差し替え
- 背景変更
- キャラクター選択

追加する場合は、操作UIを `features`、VRMや音声などのドメイン処理を `entities`、画面上のまとまった体験を `widgets` に寄せると拡張しやすくなります。
