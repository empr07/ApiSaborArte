const Sequelize = require('sequelize')
const { connection } = require("../config.db");


const User = connection.define('usuario', {
  nombres: Sequelize.STRING,
  apellido_p: Sequelize.STRING,
  apellido_m: Sequelize.STRING,
  correo: Sequelize.STRING,
  contraseña: Sequelize.STRING,
  esadministrador: Sequelize.BOOLEAN,
  activo: Sequelize.BOOLEAN,
})

module.exports = { User };