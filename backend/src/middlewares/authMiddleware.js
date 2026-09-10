const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // دریافت توکن از فرمت Bearer <TOKEN>

  if (!token) {
    return res.status(401).json({ message: 'دسترسی غیرمجاز؛ لطفا ابتدا وارد شوید.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'توکن نامعتبر یا منقضی شده است.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;