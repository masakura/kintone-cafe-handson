const express = require('express');
const _ = require('underscore');

const CartService = require('../libs/cartService');
const OrdersService = require('../libs/ordersService');
const router = express.Router();

router.get('/', (req, res) => {
  const cartService = new CartService(req);

  cartService.getCart()
    .then(cart => res.render('cart', {title: 'cart', cart}))
    .catch(console.log);
});
router.post('/add', (req, res) => {
  const cartService = new CartService(req);
  const id = req.body.id;

  cartService.addItem(id);

  res.redirect('/cart');
});
router.post('/clear', (req, res) => {
  const cartService = new CartService(req);

  cartService.clearAllItems();

  res.redirect('/cart');
});

router.get('/buy', (req, res) => {
  res.render('cart-buy', {title: '送付先'});
});
router.post('/buy', (req, res) => {
  const cartService = new CartService(req);
  const ordersService = new OrdersService(req);

  const order = {
    fullName: req.body.fullName,
    prefecture: req.body.prefecture,
    address: req.body.address
  };

  ordersService.addOrder(order)
    .then(() => cartService.clearAllItems())
    .then(() => res.render('cart-buy-finish', {title: '購入手続きが完了しました'}));
})

module.exports = router;
