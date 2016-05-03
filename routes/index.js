const express = require('express');
const Client = require('node-rest-client').Client;
const client = new Client();
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {

  client.get('https://7nkse.cybozu.com/k/v1/records.json?app=19', {
    headers: { 'X-Cybozu-API-Token': process.env['KINTONE_API_KEY'] }
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
