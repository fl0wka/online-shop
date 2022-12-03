const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./products.routes'));
router.use('/typeProduct', require('./typeProduct.routes'));
router.use('/user', require('./user.routes'));

module.exports = router;
