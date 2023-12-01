var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresProductCreate = [

    check('idcategoria').notEmpty().withMessage('El campo idcategoria es obligatorio'),
    check('idcategoria').isNumeric().withMessage('El campo idcategoria debe ser numerico'),
    check('idsabor').notEmpty().withMessage('El campo idsabor es obligatorio'),
    check('idsabor').isNumeric().withMessage('El campo idsabor debe ser numerico'),
    check('idtamaño').notEmpty().withMessage('El campo idtamaño es obligatorio'),
    check('idtamaño').isNumeric().withMessage('El campo idtamaño debe ser numerico'),
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio').isString().withMessage('El campo nombre debe ser texto'),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isString().withMessage('El campo descripcion debe ser texto'),
    check('precio').notEmpty().withMessage('El campo precio es obligatorio'),
    check('precio').isNumeric().withMessage('El campo precio debe ser numerico'),
    check('stock').notEmpty().withMessage('El campo stock es obligatorio'),
    check('stock').isNumeric().withMessage('El campo stock debe ser numerico'),
    check('rutaimagen').notEmpty().withMessage('El campo rutaimagen es obligatorio').isString().withMessage('El campo rutaimagen debe ser texto'),
    check('activo').notEmpty().withMessage('El campo activo es obligatorio'),
    check('activo').isBoolean().withMessage('El campo activo debe ser booleano'),
    check('fecharegistro').notEmpty().withMessage('El campo fecharegistro es obligatorio'),
    check('fecharegistro').isDate().withMessage('El campo fecharegistro debe ser una fecha valida'),
]

const requiresProductOptional = [
    body('idcategoria', 'idcategoria debe ser numerico').optional().isInt(),
    body('idsabor', 'idsabor debe ser numerico').optional().isInt(),
    body('idtamaño', 'idtamaño debe ser numerico').optional().isInt(),
    body('nombre', 'nombre debe ser texto').optional().notEmpty().isString(),
    body('descripcion', 'descripcion debe ser texto').optional().notEmpty().isString(),
    body('precio', 'precio debe ser numerico').optional().isNumeric(),
    body('stock', 'stock debe ser numerico entero').optional().isInt(),
    body('rutaimagen', 'rutaimagen debe ser texto').optional().notEmpty().isString(),
    body('activo', 'activo debe ser boolean').optional().isBoolean(),
    body('fecharegistro', 'fecharegistro debe ser date').optional().isDate(),
]

var ProductController = require('../controllers/ProductController');
var api = express.Router();

api.get('/productos', requiresProductOptional, ProductController.get);
api.get('/productos/:id', ProductController.getById)
api.get('/productosmasvendidos/', ProductController.getBestSellers)
api.get('/productosmenosvendidos/', ProductController.getLeastSellers)
api.post('/productos', authenticate.verifyTokenAdmin, requiresProductCreate, ProductController.create)
api.put('/productos/:id', authenticate.verifyTokenAdmin, requiresProductOptional, ProductController.update)
api.delete('/productos/:id', authenticate.verifyTokenAdmin, ProductController.destroy)
module.exports = api;



