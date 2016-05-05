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

    const promises = order.items
      .map(item => {
        return itemsService.getItem(item.id)
          .then(info => ({
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
                value: item.number
              }
            }
          }));
      });

    return Promise.all(promises)
      .then(values => {
        const data = {
          app: 25,
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
            }
          }
        };

        return fetch(`${kintoneApp.base}record.json`, {
          method: 'POST',
          body: JSON.stringify(data),
          agent,
          headers: {
            'Content-Type': 'application/json',
            'X-Cybozu-API-Token': kintoneApp.token
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            return data;
          });
      });
  }
};

module.exports = ordersService;
