const Sequelize = require('sequelize')
const { connection } = require("../config.db");
const ModelProducto = require('./ProductModel')

const DetalleCompra = connection.define('detalle_compras', {
  idcompra: Sequelize.NUMBER,
  idproducto: Sequelize.NUMBER,
  cantidad: Sequelize.NUMBER,
  fechaentrega: Sequelize.DATE,
  horaentrega: Sequelize.TIME,
  total: Sequelize.DECIMAL,
})

DetalleCompra.belongsTo(ModelProducto.Product, {foreignKey:'idproducto'})

module.exports = { DetalleCompra };