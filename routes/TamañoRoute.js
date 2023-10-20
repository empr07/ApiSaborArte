var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresTamañoCreate = [
    check('tipo').notEmpty().withMessage('El campo tipo es obligatorio').isString().withMessage('El campo tipo debe ser texto'),
]

const requiresTamañoOptional = [
    body('tipo', 'tipo debe ser texto').optional().notEmpty().isString(),
]

var TamañoController = require('../controllers/TamañoController');
var api = express.Router();

api.get('/tamanios', requiresTamañoOptional, TamañoController.get);
api.get('/tamanios/:id', TamañoController.getById)
api.post('/tamanios', authenticate.verifyTokenAdmin, requiresTamañoCreate, TamañoController.create)
api.put('/tamanios/:id', authenticate.verifyTokenAdmin, requiresTamañoOptional, TamañoController.update)
api.delete('/tamanios/:id', authenticate.verifyTokenAdmin, TamañoController.destroy)
module.exports = api;



