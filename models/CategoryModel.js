const Sequelize = require('sequelize')
const { connection } = require("../config.db");


const Category = connection.define('categorias', {
  descripcion: Sequelize.STRING,
  activo: Sequelize.BOOLEAN,
  fecharegistro: Sequelize.DATE,
})

module.exports = { Category };