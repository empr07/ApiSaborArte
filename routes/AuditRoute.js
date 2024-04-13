var express = require('express');
var authenticate = require('../middlewares/jwt');


var AuditController = require('../controllers/AuditController');
var api = express.Router();

api.get('/audits', authenticate.verifyTokenAdmin, AuditController.get);
module.exports = api;



