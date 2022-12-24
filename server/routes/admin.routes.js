const express = require('express');
const Product = require('../models/Product');
const admin = require('../middleware/admin.middleware');

const router = express.Router({ mergeParams: true });

router.post('/product', admin, async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });
    if (!product) {
      const newProduct = await Product.create(req.body);
      res.status(201).send(newProduct);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...',
    });
  }
});

router
  .route('/:productId')
  .patch(admin, async (req, res) => {
    try {
      const { productId } = req.params;

      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        {
          new: true,
        }
      );
      res.send(updateProduct);
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже...',
      });
    }
  })
  .delete(admin, async (req, res) => {
    try {
      const { productId } = req.params;

      const removeProduct = await Product.findById(productId);
      if (removeProduct) {
        await removeProduct.remove();
        return res.send(null);
      }
    } catch (error) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже...',
      });
    }
  });

module.exports = router;
