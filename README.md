# vue-sample-R-project

`vue create`で作成したものを自己流に変えたVueプロジェクト
Vue3.5系やVueRouterを使用してVueアプリ作成の参考になるものを目指しています

## 特徴

- Vue3.5系を使用
  - Composition APIを使用
- VueRouter4.4系を使用
  - 型安全なルーティング
- use~StateなどのCompositionを利用した状態管理

- TodoMvcのサンプル有り

## これからの実装予定

- Vue3.5系の新機能
  - defineModel
  - useTemplateRef
- ローカル環境変数の管理
- State管理
  - ネストコンポーネント（ステートレス）のState管理
  - エラー管理（スナックバー）
- グローバル変数
- Firebaseの導入
  - Todoデータベース
  - ログイン管理
- DIコンテナ
- ワークスペース
  - ワークスペースの作成

## Setup

```sh
bun install
```

## Run

```sh
bun run dev
```
