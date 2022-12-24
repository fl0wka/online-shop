const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
  }
});

router.get('/currentUser', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    res.send(currentUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
  }
});

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      return res.status(401).json({
        message: 'Unauthorized',
        code: 401,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
  }
});

module.exports = router;
