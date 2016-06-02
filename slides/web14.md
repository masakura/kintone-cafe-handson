### まとめ
* kintone API は REST API が使える
* アプリの設定の API トークンでトークンを取得
  - `X-Cybozu-API-Token: API トークン` をヘッダーにつける
  - `GET https://7nkse.cybozu.com/k/v1/records.json?app=34` ですべて
  - `GET https://7nkse.cybozu.com/k/v1/record.json?app=34&id=1` で一行
* JSON データがちょっと特殊なので加工して扱うのをおすすめ
