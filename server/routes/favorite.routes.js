const express = require('express');
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Favorite.find();
      res.send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const userFavorite = await Favorite.findOne({ userId: req.user._id });
      if (!userFavorite) {
        const newFavorite = await Favorite.create({
          ...req.body,
          userId: req.user._id,
        });
        res.status(201).send(newFavorite);
      } else {
        res.send(userFavorite);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
    }
  });

router.get('/userFavorite', auth, async (req, res) => {
  try {
    const userFavorite = await Favorite.findOne({ userId: req.user._id });
    res.send(userFavorite);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже...',
    });
  }
});

router.patch('/:favoriteId', auth, async (req, res) => {
  try {
    const { favoriteId } = req.params;

    if (req.body.userId.toString() === req.user._id) {
      const updateUserFavorite = await Favorite.findByIdAndUpdate(
        favoriteId,
        req.body,
        {
          new: true,
        }
      );
      res.send(updateUserFavorite);
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
