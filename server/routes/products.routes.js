const express = require('express');
const Product = require('../models/Product');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await Product.findById(productId);
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
  }
});

module.exports = router;
