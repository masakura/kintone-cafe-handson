const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');
const CartService = require('./cartService')

const kintoneApp = {
  // ex: https://7nkse.cybozu.com/k/v1/
  base: process.env['KINTONE_BASE'],
  // ex: 25
  id: process.env['KINTONE_APP_ORDERS_ID'],
  token: process.env['KINTONE_APP_ORDERS_TOKEN']
};
const agent = process.env['https_proxy'] ? new HttpsProxyAgent(process.env['https_proxy']) : null;

class OrdersService {
  constructor (req) {
    this._cartService = new CartService(req);
  }

  addOrder(order) {
    return this._cartService.getCart()
      // カートの商品を kintone のレコード形式に変換する
      .then(cart => cart.items.map(item => ({
        value: {
          code: {
            value: item.code
          },
          name: {
            value: item.name
          },
          unitPrice: {
            value: item.price
          },
          number: {
            value: item.number
          }
        }
      })))
      // 住所・氏名をつけて kintone のレコード形式にする
      .then(details => ({
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
            value: details
          }
        }
      }))
      .then(record => {console.log(JSON.stringify(record)); return record;})
      // kintone API で登録する
      .then(record => fetch(`${kintoneApp.base}record.json`, {
        method: 'POST',
        body: JSON.stringify(record),
        agent,
        headers: {
          'Content-Type': 'application/json',
          'X-Cybozu-API-Token': kintoneApp.token
        }
      }))
      // 戻り値を JSON に変換
      .then(res => res.json())
      .catch(console.log);
  }
}

module.exports = OrdersService;
