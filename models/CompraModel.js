const Sequelize = require('sequelize')
const { connection } = require("../config.db");
const ModelDetalleCompra = require('./DetalleCompraModel')
const ModelUser = require('./UserModel')
const ModelPago = require('./PagoModel')


const Compra = connection.define('compras', {
    idusuario: Sequelize.NUMBER,
    totalproducto: Sequelize.NUMBER,
    total: Sequelize.NUMBER,
    fechacompra: Sequelize.DATE,
})

Compra.belongsTo(ModelUser.User, {foreignKey:'idusuario'})
Compra.hasMany(ModelDetalleCompra.DetalleCompra, {foreignKey:'idcompra'})
Compra.hasOne(ModelPago.Pago, {foreignKey:'idcompra'})
ModelPago.Pago.belongsTo(Compra, {foreignKey:'idcompra'})



module.exports = { Compra };