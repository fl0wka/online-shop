const tokenService = require('../services/token.service');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // return 'Bearer fghjklgfhfghjkvfdvn'
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

    req.user = data;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      code: 401,
    });
  }
};
