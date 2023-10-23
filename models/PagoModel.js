const Sequelize = require('sequelize')
const { connection } = require("../config.db");
const ModelCompra = require('./CompraModel')

const Pago = connection.define('pagos', {
    idcompra: Sequelize.NUMBER,
    metodo: Sequelize.STRING,
    totalpagado: Sequelize.NUMBER,
    direccion: Sequelize.STRING,
    pais: Sequelize.STRING,
    nombres: Sequelize.STRING,
    apellidos: Sequelize.STRING,
    telefono: Sequelize.STRING,
    cp: Sequelize.STRING,
    calles: Sequelize.STRING,
    ciudad: Sequelize.STRING,
    estado: Sequelize.STRING,
})


module.exports = { Pago };