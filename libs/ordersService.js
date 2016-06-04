const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const itemsService = require('./itemsService');

const kintoneApp = {
  // ex: https://7nkse.cybozu.com/k/v1/
  base: process.env['KINTONE_BASE'],
  // ex: 25
  id: process.env['KINTONE_APP_ORDERS_ID'],
  token: process.env['KINTONE_APP_ORDERS_TOKEN']
};
const agent = process.env['https_proxy'] ? new HttpsProxyAgent(process.env['https_proxy']) : null;

const ordersService = {
  addOrder(order) {
    console.log(order.items);

    return itemsService.getItems(order.items.map(item => item.id))
      // 受注の注文一覧部分のデータを作成する
      .then(items => items.map(info => ({
        value: {
          code: {
            value: info.code
          },
          name: {
            value: info.name
          },
          unitPrice: {
            value: info.price
          },
          number: {
            value: 1 // item.number
          },
        }})))
      // 受注データを作成する
      .then(values => ({
          app: kintoneApp.id,
          record: {
            prefecture: {
              value: order.prefecture
            },
            address: {
              value: order.address
            },
            fullName: {
              value: order.fullName
            },
            details: {
              value: values
            },
          }}))
      // kintone API で登録する
      .then(data => fetch(`${kintoneApp.base}record.json`, {
          method: 'POST',
          body: JSON.stringify(data),
          agent,
          headers: {
            'Content-Type': 'application/json',
            'X-Cybozu-API-Token': kintoneApp.token
          }
        }))
      // 戻り値を JSON に変換
      .then(res => res.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(console.log);
  }
};

module.exports = ordersService;
