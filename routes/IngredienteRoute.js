var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var IngredienteController = require('../controllers/IngredienteController');
var authenticate = require('../middlewares/jwt');
var api = express.Router();

const requiresIngredienteCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio').isString().withMessage('El campo nombre debe ser texto'),
]

const requiresIngredienteOptional = [
    body('nombre', 'nombre debe ser texto').optional().notEmpty().isString(),
]

api.get('/ingredientes', requiresIngredienteOptional, IngredienteController.get);
api.get('/ingredientes/:id', IngredienteController.getById)
api.post('/ingredientes', authenticate.verifyTokenAdmin, requiresIngredienteCreate, IngredienteController.create)
api.put('/ingredientes/:id', authenticate.verifyTokenAdmin, requiresIngredienteOptional, IngredienteController.update)
api.delete('/ingredientes/:id', authenticate.verifyTokenAdmin, IngredienteController.destroy)
module.exports = api;
