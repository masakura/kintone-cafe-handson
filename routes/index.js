const express = require('express');
const Client = require('node-rest-client').Client;
const client = new Client();
const router = express.Router();

const kintoneApp = {
  base: process.env['KINTONE_BASE'],
  id: process.env['KINTONE_APP_ITEMS_ID'],
  token: process.env['KINTONE_APP_ITEMS_TOKEN']
};

/* GET home page. */
router.get('/', (req, res) => {

  console.log(`${kintoneApp.base}records.json?app=${kintoneApp.id}`);
  client.get(`${kintoneApp.base}records.json?app=${kintoneApp.id}`, {
    headers: { 'X-Cybozu-API-Token': kintoneApp.token }
  }, (data) => {
    const prefectures = data.records
        .map(row => ({
          code: row.Number.value,
          name: row.Single_line_text.value
        }));
    prefectures.sort((a, b) => a.code - b.code);

    res.render('index', { title: 'Express', prefectures});
  });
});

module.exports = router;
