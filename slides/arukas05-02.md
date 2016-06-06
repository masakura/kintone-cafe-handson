### CircleCI を設定する
ビルドができるようにプロジェクト設定を行います (Docker Hub にプッシュするためのアカウント情報の設定)

1. `Project Settings` をクリック
2. `Build Settings` の `Environment Variables` をクリック
3. `Name` に `$DOCKER_EMAIL` を、`Value` に Docker ID のメールアドレスを入力し、`Save Variables` ボタンをクリック
  - 同様に `$DOCKER_USER` に Docker ID を
  - 同様に `$DOCKER_PASS` に Docker ID のパスワードを
4. `View taniyama-shopping` をクリック
5. `master #??` をクリック
6. `Rebuild` ボタンをクリック
  - ビルドが開始されます!
