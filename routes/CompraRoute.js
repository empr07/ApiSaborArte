var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresCompraCreate = [
    check('totalproducto').notEmpty().withMessage('El campo totalproducto es obligatorio'),
    check('totalproducto').isNumeric().withMessage('El campo totalproducto debe ser numerico'),
    check('total').notEmpty().withMessage('El campo total es obligatorio'),
    check('total').isNumeric().withMessage('El campo total debe ser numerico'),
    check('fechacompra').notEmpty().withMessage('El campo fechacompra es obligatorio'),
    check('fechacompra').isDate().withMessage('El campo fechacompra debe ser una fecha valida'),
    check('detalles').notEmpty().withMessage('El campo detalles es obligatorio'),
    check('detalles').isArray().withMessage('El campo detalles debe ser un arreglo'),
    check('pago').notEmpty().withMessage('El campo pago es obligatorio'),
    check('pago').isObject().withMessage('El campo pago debe ser un objeto'),
    

]

const requiresCompraOptional = [
    body('idusuario', 'idusuario debe ser numerico').optional().isInt(),
    body('totalproducto', 'totalproducto debe ser numerico').optional().isNumeric(),
    body('total', 'total debe ser numerico entero').optional().isInt(),
    body('fechacompra', 'fechacompra debe ser date').optional().isDate(),
]

var CompraController = require('../controllers/CompraController');
var api = express.Router();

api.get('/compras', authenticate.verifyTokenAdmin, requiresCompraOptional, CompraController.get)
api.get('/compras/:id', authenticate.verifyTokenAdmin, CompraController.getById)
api.post('/compras', authenticate.verifyTokenAdmin, requiresCompraCreate, CompraController.create)
api.put('/compras/:id', authenticate.verifyTokenAdmin, requiresCompraOptional, CompraController.update)
api.delete('/compras/:id', authenticate.verifyTokenAdmin, CompraController.destroy)

api.get('/comprasporusuario', authenticate.verifyTokenUser, requiresCompraOptional, CompraController.getByUser)
api.post('/comprasporusuario', authenticate.verifyTokenUser, requiresCompraCreate, CompraController.createByUser)
module.exports = api;



