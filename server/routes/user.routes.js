const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

// В теории, данный запрос может пригодиться на учётке admin'а
// для получения всех пользователей с их именами, адресами и покупками
router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'На сервере произошла ошибка. Попробуйте позже...' });
    // console.log(error);
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
    // console.log(error);
  }
});

module.exports = router;
