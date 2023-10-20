const Sequelize = require('sequelize')
const { connection } = require("../config.db");


const Ingrediente = connection.define('ingrediente', {
  nombre: Sequelize.STRING,
})

module.exports = { Ingrediente };