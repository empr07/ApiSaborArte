const jwt = require('jsonwebtoken');

function verifyTokenAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No se proporcionó un token' });
  }

  jwt.verify(token, 'lkjpqjcnporsthmlpqsc', (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Sin autorización' });
    }
    if (decoded.data.esadministrador) {
      next();
    }
    else {
      return res.status(403).send({ message: 'Sin autorización' });
    }

  });
}

function verifyTokenUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No se proporcionó un token' });
  }

  jwt.verify(token, 'lkjpqjcnporsthmlpqsc', (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Sin autorización' });
    }
    req.query.idusuario = decoded.data.id
    next();

  });
}

module.exports = {
  verifyTokenAdmin,
  verifyTokenUser
};

