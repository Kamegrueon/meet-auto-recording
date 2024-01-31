# Meet Auto Recording

## 概要
Google Meet入室時に自動で録画を開始してくれるGoogle Chromeの拡張機能を作成しました。
下記の使い方に従い設定を行うと使用できるようになります。

## 使い方
1. `$ docker compose up build` を実行しスクリプトをコンパイルする
2. `dist` ディレクトリが生成されたら、ブラウザに`chrome://extensions/` と入力し拡張機能の画面を表示する
3. 画面右上の `パッケージ化されていない拡張機能を読み込む` をクリックし生成された `dist` ディレクトリを選択する

## 補足
`$ docker compose up -d dev` を実行すると開発用コンテナが起動します。ファイルの修正等はこちらで。