const Sequelize = require('sequelize')
const { connection } = require("../config.db");


const Sabor = connection.define('sabores', {
  sabor: Sequelize.STRING,
})

module.exports = { Sabor };