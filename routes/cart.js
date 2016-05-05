const express = require('express');
const _ = require('underscore');
const itemsService = require('../libs/itemsService');
const ordersService = require('../libs/ordersService');
const router = express.Router();

function total(items) {
  return items
    .map(item => item.total)
    .reduce((prev, current) => prev + current, 0);
}

router.get('/', (req, res) => {
  const cart = req.session.cart = req.session.cart || {items: {}};
  var promises = _.values(cart.items)
    .map(item => itemsService.getItem(item.id)
        .then(info => ({
          id: info.id,
          code: info.code,
          name: info.name,
          price: info.price,
          number: String(item.number),
          total: info.price * item.number
        })));

  Promise.all(promises)
    .then(values => ({
      items: values,
      total: total(values)
    }))
    .then(cart => res.render('cart', {title: 'カート', cart}));
});
router.post('/add', (req, res) => {
  const id = req.body.id;

  // Add item to cart
  const cart = req.session.cart = req.session.cart || {items: {}};
  const item = cart.items[id] = cart.items[id] || {id: id, number: 0};
  item.number++;

  res.redirect('/cart');
});
router.post('/clear', (req, res) => {
  req.session.cart = {items: {}};

  res.redirect('/cart');
});

router.get('/buy', (req, res) => {
  res.render('cart-buy', {title: '送付先'});
});
router.post('/buy', (req, res) => {
  const order = {
    fullName: req.body.fullName,
    prefecture: req.body.prefecture,
    address: req.body.address,
    items: _.values((req.session.cart || {items: {}}).items)
  };

  ordersService.addOrder(order)
    .then(() => req.session.cart = {items: {}})
    .then(() => res.render('cart-buy-finish', {title: '購入手続きが完了しました'}));
})

module.exports = router;
