const Sequelize = require('sequelize')
const { connection } = require("../config.db");


const Tamaño = connection.define('tamaños', {
  tipo: Sequelize.STRING,
})

module.exports = { Tamaño };