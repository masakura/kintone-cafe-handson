### REST API を呼び出す
Google Chrome の DHC アプリを使って試しに呼び出します

https://chrome.google.com/webstore/detail/dhc-rest-client/aejoelaoggembcahagimdiliamlcdmfm

1. `REQUEST` に商品管理アプリの REST API の URL を
  - `https://7nkse.cybozu.com/k/v1/records.json?app=34`
2. `HEADERS` の下の `+` ボタンをクリック
3. `name` に `X-Cybozu-API-Token` を入力
4. `value` に先ほど取得した API トークンを
5. `Send` ボタンをクリック!
  - 右側に JSON が表示される!
6. `+ Open` ボタンをクリック
  - こんな感じのデータが返ってきます
