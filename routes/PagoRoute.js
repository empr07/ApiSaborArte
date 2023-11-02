var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresPagoCreate = [
    check('idcompra').notEmpty().withMessage('El campo idcompra es obligatorio'),
    check('idcompra').isNumeric().withMessage('El campo idcompra debe ser numerico'),
    check('metodo').notEmpty().withMessage('El campo metodo es obligatorio').isString().withMessage('El campo metodo debe ser texto'),
    check('totalpagado').notEmpty().withMessage('El campo totalpagado es obligatorio'),
    check('totalpagado').isNumeric().withMessage('El campo totalpagado debe ser numerico'),
    check('direccion').notEmpty().withMessage('El campo direccion es obligatorio').isString().withMessage('El campo direccion debe ser texto'),
    check('pais').notEmpty().withMessage('El campo pais es obligatorio').isString().withMessage('El campo pais debe ser texto'),
    check('nombres').notEmpty().withMessage('El campo nombres es obligatorio').isString().withMessage('El campo nombres debe ser texto'),
    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio').isString().withMessage('El campo apellidos debe ser texto'),
    check('telefono').notEmpty().withMessage('El campo telefono es obligatorio').isString().withMessage('El campo telefono debe ser texto'),
    check('cp').notEmpty().withMessage('El campo cp es obligatorio').isString().withMessage('El campo cp debe ser texto'),
    check('calles').notEmpty().withMessage('El campo calles es obligatorio').isString().withMessage('El campo calles debe ser texto'),
    check('ciudad').notEmpty().withMessage('El campo ciudad es obligatorio').isString().withMessage('El campo ciudad debe ser texto'),
    check('estado').notEmpty().withMessage('El campo estado es obligatorio').isString().withMessage('El campo estado debe ser texto'),
]

const requiresPagoOptional = [
    body('idcompra', 'idcompra debe ser numerico').optional().isInt(),
    body('metodo', 'metodo debe ser texto').optional().notEmpty().isString(),
    body('totalpagado', 'totalpagado debe ser numerico').optional().isNumeric(),
    body('direccion', 'direccion debe ser texto').optional().notEmpty().isString(),
    body('pais', 'direccion debe ser texto').optional().notEmpty().isString(),
    body('nombres', 'nombres debe ser texto').optional().notEmpty().isString(),
    body('apellidos', 'apellidos debe ser texto').optional().notEmpty().isString(),
    body('telefono', 'telefono debe ser texto').optional().notEmpty().isString(),
    body('cp', 'cp debe ser texto').optional().notEmpty().isString(),
    body('calles', 'calles debe ser texto').optional().notEmpty().isString(),
    body('ciudad', 'ciudad debe ser texto').optional().notEmpty().isString(),
    body('estado', 'estado debe ser texto').optional().notEmpty().isString(),

]

var PagoController = require('../controllers/PagoController');
var api = express.Router();

api.get('/pagos', requiresPagoOptional, PagoController.get);
api.get('/pagos/:id', PagoController.getById)
// api.post('/pagos', authenticate.verifyTokenAdmin, requiresPagoCreate, PagoController.create)
// api.put('/pagos/:id', authenticate.verifyTokenAdmin, requiresPagoOptional, PagoController.update)
// api.delete('/pagos/:id', authenticate.verifyTokenAdmin, PagoController.destroy)
module.exports = api;



