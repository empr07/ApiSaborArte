var express = require('express');
const { check } = require('express-validator');
const { body } = require('express-validator/check');
var authenticate = require('../middlewares/jwt');

const requiresLogin = [
    check('correo').notEmpty().withMessage('El campo correo es obligatorio').isEmail().withMessage('El campo correo debe ser tipo email'),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio'),
    check('contraseña').isString().withMessage('El campo contraseña debe ser texto'),
]

const requiresRegister = [
    check('nombres').notEmpty().withMessage('El campo nombre es obligatorio').
        isString().withMessage('El campo nombres debe ser texto'),

    check('apellido_p').notEmpty().withMessage('El campo apellido_p es obligatorio').
        isString().withMessage('El campo apellido_p debe ser texto'),

    check('apellido_m').notEmpty().withMessage('El campo apellido_m es obligatorio').
        isString().withMessage('El campo apellido_m debe ser texto'),

    check('correo').notEmpty().withMessage('El campo correo es obligatorio').
        isEmail().withMessage('El campo correo debe ser email'),

    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio').
        isString().withMessage('El campo contraseña debe ser texto'),

    check('activo').notEmpty().withMessage('El campo activo es obligatorio').
        isBoolean().withMessage('El campo activo debe ser booleano'),
]


const requiresOptional = [
    body('nombres', 'nombres debe ser texto').optional().notEmpty().isString(),
    body('apellido_p', 'apellido_p debe ser texto').optional().notEmpty().isString(),
    body('apellido_m', 'apellido_m debe ser texto').optional().notEmpty().isString(),
    body('correo', 'correo debe ser email').optional().isEmail(),
    body('contraseña', 'contraseña debe ser texto').optional().notEmpty().isString(),
    body('activo', 'activo debe ser boolean').optional().isBoolean(),
]

const requiresOptionalAdmin = [
    body('nombres', 'nombres debe ser texto').optional().notEmpty().isString(),
    body('apellido_p', 'apellido_p debe ser texto').optional().notEmpty().isString(),
    body('apellido_m', 'apellido_m debe ser texto').optional().notEmpty().isString(),
    body('correo', 'correo debe ser email').optional().isEmail(),
    body('contraseña', 'contraseña debe ser texto').optional().notEmpty().isString(),
    body('activo', 'activo debe ser boolean').optional().isBoolean(),
    body('esadministrador', 'activo debe ser boolean').optional().isBoolean(),
]


var AuthController = require('../controllers/AuthController');
var api = express.Router();


api.post('/auth/login', requiresLogin, AuthController.login)
api.post('/auth/registro', requiresRegister, AuthController.registerNoAdmin)
api.post('/auth/registroadmin', authenticate.verifyTokenAdmin, requiresRegister, AuthController.registerAdmin)
api.put('/auth/usuarios/update', authenticate.verifyTokenUser, requiresOptional, AuthController.updateNoAdmin)
api.put('/auth/usuarios/updateadmin', authenticate.verifyTokenAdmin, requiresOptionalAdmin, AuthController.updateAdmin)
api.get('/auth/usuarios', authenticate.verifyTokenAdmin, requiresOptional, AuthController.getUsers)
api.get('/auth/usuarios/:id', authenticate.verifyTokenAdmin, AuthController.getUserById)
api.delete('/auth/usuarios/:id', authenticate.verifyTokenAdmin, AuthController.destroyUser)

module.exports = api;



