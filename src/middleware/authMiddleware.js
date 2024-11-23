const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (requiredRole) => (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  const actualToken = token.split(' ')[1];

  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
