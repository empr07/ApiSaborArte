var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresCategoryCreate = [
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isString().withMessage('El campo descripcion debe ser texto'),
    check('activo').notEmpty().withMessage('El campo activo es obligatorio'),
    check('activo').isBoolean().withMessage('El campo activo debe ser booleano'),
    check('fecharegistro').notEmpty().withMessage('El campo fecharegistro es obligatorio'),
    check('fecharegistro').isDate().withMessage('El campo fecharegistro debe ser una fecha valida'),
]

const requiresCategoryOptional = [
    body('descripcion', 'descripcion debe ser texto').optional().notEmpty().isString(),
    body('activo', 'activo debe ser boolean').optional().isBoolean(),
    body('fecharegistro', 'fecharegistro debe ser date').optional().isDate(),
]

var CategoryController = require('../controllers/CategoryController');
var api = express.Router();

api.get('/categorias', requiresCategoryOptional, CategoryController.get);
api.get('/categorias/:id', CategoryController.getById)
api.get('/categoriasmasvendidas/', CategoryController.getBestCategories)
api.post('/categorias', authenticate.verifyTokenAdmin, requiresCategoryCreate, CategoryController.create)
api.put('/categorias/:id', authenticate.verifyTokenAdmin, requiresCategoryOptional, CategoryController.update)
api.delete('/categorias/:id', authenticate.verifyTokenAdmin, CategoryController.destroy)
module.exports = api;
