var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresDetalleCompraCreate = [
    check('idcompra').notEmpty().withMessage('El campo idcompra es obligatorio'),
    check('idcompra').isNumeric().withMessage('El campo idcompra debe ser numerico'),
    check('idproducto').notEmpty().withMessage('El campo idproducto es obligatorio'),
    check('idproducto').isNumeric().withMessage('El campo idproducto debe ser numerico'),
    check('total').notEmpty().withMessage('El campo total es obligatorio'),
    check('total').isNumeric().withMessage('El campo total debe ser numerico'),
    check('cantidad').notEmpty().withMessage('El campo cantidad es obligatorio'),
    check('cantidad').isNumeric().withMessage('El campo cantidad debe ser numerico'),
    check('fechaentrega').notEmpty().withMessage('El campo fechaentrega es obligatorio'),
    check('fechaentrega').isDate().withMessage('El campo fechaentrega debe ser una fecha valida'),
    check('horaentrega').notEmpty().withMessage('El campo horaentrega es obligatorio'),
    check('horaentrega').isTime({
        mode: 'withSeconds'
    }).withMessage('El campo horaentrega debe ser una hora valida'),
]

const requiresDetalleCompraOptional = [
    body('idcompra', 'idcompra debe ser numerico').optional().isInt(),
    body('idproducto', 'idproducto debe ser numerico').optional().isInt(),
    body('total', 'total debe ser numerico').optional().isNumeric(),
    body('cantidad', 'cantidad debe ser numerico entero').optional().isInt(),
    body('fechaentrega', 'fechaentrega debe ser date').optional().isDate(),
    body('horaentrega', 'horaentrega debe ser time').optional().isTime({
        mode: 'withSeconds'
    }),
]

var DetalleCompraController = require('../controllers/DetalleCompraController');
var api = express.Router();

api.get('/detallecompras', authenticate.verifyTokenAdmin, requiresDetalleCompraOptional, DetalleCompraController.get);
api.get('/detallecompras/:id', authenticate.verifyTokenAdmin, DetalleCompraController.getById)
api.post('/detallecompras', authenticate.verifyTokenAdmin, requiresDetalleCompraCreate, DetalleCompraController.create)
api.put('/detallecompras/:id', authenticate.verifyTokenAdmin, requiresDetalleCompraOptional, DetalleCompraController.update)
api.delete('/detallecompras/:id', authenticate.verifyTokenAdmin, DetalleCompraController.destroy)
module.exports = api;



