var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresProductoTamañoCreate = [
    check('id_producto').notEmpty().withMessage('El campo id_producto es obligatorio'),
    check('id_producto').isNumeric().withMessage('El campo id_producto debe ser numerico'),
    check('idtamaño').notEmpty().withMessage('El campo idtamaño es obligatorio'),
    check('idtamaño').isNumeric().withMessage('El campo idtamaño debe ser numerico'),
]

const requiresProductoTamañoOptional = [
    body('id_producto', 'id_producto debe ser numerico').optional().isInt(),
    body('idtamaño', 'idtamaño debe ser numerico').optional().isInt(),
]

var ProductoTamañoController = require('../controllers/ProductoTamañoController');
var api = express.Router();

api.get('/productotamaños', requiresProductoTamañoOptional, ProductoTamañoController.get);
api.get('/productotamaños/:id', ProductoTamañoController.getById)
api.post('/productotamaños', authenticate.verifyTokenAdmin, requiresProductoTamañoCreate, ProductoTamañoController.create)
api.delete('/productotamaños/:id', authenticate.verifyTokenAdmin, ProductoTamañoController.destroy)
module.exports = api;



