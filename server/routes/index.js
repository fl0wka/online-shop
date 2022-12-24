const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./products.routes'));
router.use('/typeProduct', require('./typeProduct.routes'));
router.use('/user', require('./user.routes'));
router.use('/cart', require('./cart.routes'));
router.use('/favorite', require('./favorite.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
