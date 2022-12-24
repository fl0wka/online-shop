const User = require('../models/User');
const tokenService = require('../services/token.service');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
        code: 401,
      });
    }

    const data = tokenService.validateAccess(token);
    if (!data) {
      return res.status(401).json({
        message: 'Unauthorized',
        code: 401,
      });
    }

    const user = await User.findById(data._id);
    if (user.role !== 'admin') {
      return res.status(401).json({
        message: 'No admin rights',
        code: 401,
      });
    }

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      code: 401,
    });
  }
};
