# Node.js インストール済み Debian Jessie をベースにする
FROM node:6

# アプリのディレクトリを /app にする
ENV APP_HOME /app
WORKDIR ${APP_HOME}

# 必要なライブラリ (Express など) をインストールする
ADD package.json package.json
RUN npm install --no-progress && rm -rf /root/.npm

# アプリの HTML/JS などをコピー
ADD app.js app.js
ADD bin bin
ADD libs libs
ADD public public
ADD routes routes
ADD views views

# TCP 3000 番ポートを使うことを宣言
# Arukas の Port にはこれを設定する
EXPOSE 3000/tcp

# コンテナーが起動した時に実行されるコマンド
# アプリが起動します
ENTRYPOINT npm start
