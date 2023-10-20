var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresSaborCreate = [
    check('sabor').notEmpty().withMessage('El campo sabor es obligatorio').isString().withMessage('El campo sabor debe ser texto'),
]

const requiresSaborOptional = [
    body('sabor', 'sabor debe ser texto').optional().notEmpty().isString(),
]

var SaborController = require('../controllers/SaborController');
var api = express.Router();

api.get('/sabores', requiresSaborOptional, SaborController.get);
api.get('/sabores/:id', SaborController.getById)
api.post('/sabores', authenticate.verifyTokenAdmin, requiresSaborCreate, SaborController.create)
api.put('/sabores/:id', authenticate.verifyTokenAdmin, requiresSaborOptional, SaborController.update)
api.delete('/sabores/:id', authenticate.verifyTokenAdmin, SaborController.destroy)
module.exports = api;



