`指定する` をチェックし、`+` ボタンで環境変数を入力

![Input Env](resources/arukas-input-env.jpg)
1. `新しいアプリケーションを作成`ボタンをクリック
2. 以下のように入力
  - `App Name` に `shopping` を
  - `Image` に `masakura/shopping:4cefaec` を
  - `Image` は自分の環境に合わせてね!
  - `Port` は `3000:tcp` を
3. `ENV` に以下のように入力 (環境に合わせてね!)
  - `KINTONE_BASE` に `https://7nkse.cybozu.com/k/v1/` を
  - `KINTONE_APP_ITEMS_ID` に商品管理アプリ ID を
  - `KINTONE_APP_ITEMS_TOKEN` に商品管理アプリのトークンを
  - `KINTONE_APP_ORDERS_ID` に受注管理アプリ ID を
  - `KINTONE_APP_ORDERS_TOKEN` に受注管理アプリのトークンを
  - 他はそのままで!
4. `アプリケーションを作成` ボタンをクリック

5. `アプリはデプロイ中です` と表示される
6. しばらく待つと、`アプリは起動状態です` と表示される
  - 5 分とか必要かも...
7. 起動したら `Endpoint` をクリック!
  - 動いた!!!!!
