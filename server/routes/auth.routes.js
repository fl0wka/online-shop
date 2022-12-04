const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const tokenService = require('../services/token.service');

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Пароль должен содержать не меньше 8 символов').isLength({
    min: 8,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: { message: 'INVALID_DATA', code: 400 },
          // error: errors.array(),
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(200).json({ ...tokens, userId: newUser._id });
    } catch (error) {
      res.status(500).json({
        message: 'На сервере что-то пошло не так. Попробуйте позже...',
      });
      // console.log(error);
    }
  },
]);

router.post('/signIn', [
  check('email', 'Некорректный email').normalizeEmail().isEmail(),
  check('password', 'Пароль должен быть введен').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
          },
          error: errors.array(),
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).json({
        ...tokens,
        userId: existingUser._id,
      });
    } catch (error) {
      res.status(500).json({
        message: 'На сервере что-то пошло не так. Попробуйте позже...',
      });
      // console.log(error);
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;

    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = tokenService.findToken(refreshToken);

    if (!isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: 'Unauthorized',
        code: 401,
      });
    }

    const tokens = tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, refreshToken);

    res.status(200).json({
      ...tokens,
      userId: data._id,
    });
  } catch (error) {
    res.status(500).json({
      message: 'На сервере что-то пошло не так. Попробуйте позже...',
    });
    // console.log(error);
  }
});

module.exports = router;
