const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Cart.find();
      res.send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const userCart = await Cart.findOne({ userId: req.user._id });
      if (!userCart) {
        const newCart = await Cart.create({
          ...req.body,
          userId: req.user._id,
        });
        res.status(201).send(newCart);
      } else {
        res.send(userCart);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
    }
  });

router.get('/userCart', auth, async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user._id });
    res.send(userCart);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...',
    });
  }
});

router.patch('/:cartId', auth, async (req, res) => {
  try {
    const { cartId } = req.params;

    if (req.body.userId.toString() === req.user._id) {
      const updateUserCart = await Cart.findByIdAndUpdate(cartId, req.body, {
        new: true,
      });
      res.send(updateUserCart);
    } else {
      return res.status(401).json({
        message: 'Unauthorized',
        code: 401,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...',
    });
  }
});

module.exports = router;
