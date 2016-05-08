# オンラインショッピングハンズオンプロトタイプ

![スクリーンショット](screenshot.jpg)

## 目的
kintone をバックエンドに利用することで手軽にアプリが作れること、arukas を使うことで手軽にアプリをデプロイできることを学ぶ。

## 構成
* kintone アプリは `商品管理` と `受注管理` の二つで構成されています
* アプリは Node.js 6.0 + Express 4 を利用しています
  - 商品の情報を `商品管理` アプリから取得し、注文を `受注管理` に追加します
* アプリを Docker イメージ化する [Dokcerfile](Dockerfile) 付
  - それを DockerHub にプッシュする [circle.yml](circle.yml) 付
* GitHub へコミットすれば、arukas にすぐにデプロイできるようになっています
  - Docker 環境はローカルには必要ありません
  - arukas へのデプロイは手動です


## 手順
### 事前準備
* Node.js v6 のインストール
* 何かしらの Git Client のインストール
* [kintone 30 日間無料お試し](https://kintone.cybozu.com/jp/ad010/)で `kintone アカウント`を取得
* [Join GitHub](https://github.com/join?source=header-home) で `GitHub アカウント` を取得
* [New to Docker?](https://hub.docker.com/) で `Docker ID` を取得


### ハンズオン
1. kintone でオンラインショップのアプリの基盤となるところを作り、それを使って kintone アプリを体験する
2. オンラインショップアプリを作る
3. Docker イメージ化して arukas にデプロイ


#### kintone でアプリを作る
1. kintone にログインし、[オンラインショップアプリのテンプレート](kintone/onlineshophandson.zip)を読み込む
2. アプリをテンプレートから作成する
3. `商品アプリ`に商品を登録する
4. `受注アプリ`で受注を入力し、入金確認や配送の各担当者が受注アプリを中心に作業ができることを確認する

作成した kintone アプリを実際に使ってもらうことが大切。今回は kintone アプリの作り方はスコープ外だけど、設定画面を見せながらどんな感じで作るのか? みたいな解説は必要だと思う。


#### オンラインショップアプリを作る
1. kintone で API Token を発行する
  - `商品アプリ`は読み取りのみ
  - `受注アプリ`は新規追加のみ
2. [GitHub のこのプロジェクト](https://github.com/masakura/express-prototype)をフォークする
3. フォークしたプロジェクトを `git clone`
  - `npm install` でパッケージをインストール
4. 環境変数を設定する
  - `KINTONE_BASE` - kintone の URL (Ex: https://7nkse.cybozu.com/k/v1/)
  - `KINTONE_APP_ITEMS_ID` - 商品アプリのアプリ ID (Ex: 21)
  - `KINTONE_APP_ITEMS_TOKEN` - 商品アプリの API Token
  - `KINTONE_APP_ORDERS_ID` - 受注アプリのアプリ ID (Ex: 25)
  - `KINTONE_APP_ORDERS_TOKEN` - 受注アプリの API Token
5. コードを少しずつ書きながら `node bin/www` で実行
  - 商品一覧を取得するコードを書く [./libs/itemsService.js](./libs/itemsService.js)
  - カートのための商品を取得するコードを書く [./libs/itemsService.js](./libs/itemsService.js)
  - 注文を書き込むコードを書く [./libs/ordersService.js](./libs/ordersService.js)
6. 遊んでみる
  - `商品アプリ` を書き換えたらオンラインショップに反映される
  - 注文をすると `受注アプリ` に注文が入る

今回は Node.js や Epxress のハンズオンではないので、kintone API のアクセスの部分だけをハンズオンする。だけど、それだけだとイメージがつきにくいので、コントローラーやビューのコードの解説は必要だと思う。


#### Docker イメージ化して arukas にデプロイ
1. [circle.yml](circle.yml] ファイルを自分の Docker Hub アカウントに書き換える
2. Circle CI でフォークしたプロジェクトのビルド設定を行う (環境変数を設定する)
  - `DOCKER_EMAIL` - Docker ID のメールアドレス
  - `DOCKER_USER` - Docker ID
  - `DOCKER_PASS` - パスワード
3. Docker Hub にログインして、イメージが Push されているかを確認する
4. arukas にログインして、アプリの設定を行いデプロイ
  - `KINTONE_BASE` - kintone の URL (Ex: https://7nkse.cybozu.com/k/v1/)
  - `KINTONE_APP_ITEMS_ID` - 商品アプリのアプリ ID (Ex: 21)
  - `KINTONE_APP_ITEMS_TOKEN` - 商品アプリの API Token
  - `KINTONE_APP_ORDERS_ID` - 受注アプリのアプリ ID (Ex: 25)
  - `KINTONE_APP_ORDERS_TOKEN` - 受注アプリの API Token
  - Docker イメージ名は 1 で設定したもの
  - ポート番号は `3000` で
5. 遊んでみる

今回はDocker のハンズオンではないが、Docker が何か、Circle CI が何かは簡単に解説が必要だと思う。
