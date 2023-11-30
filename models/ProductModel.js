const Sequelize = require('sequelize')
const { connection } = require("../config.db");
const ModelCategoria = require("./CategoryModel")
const ModelColor = require("./SaborModel")
const ModelTamaño = require("./TamañoModel")

const Product = connection.define('producto', {
  idcategoria: Sequelize.NUMBER,
  idsabor: Sequelize.NUMBER,
  idtamaño: Sequelize.NUMBER,
  nombre: Sequelize.STRING,
  descripcion: Sequelize.STRING,
  precio: Sequelize.FLOAT,
  stock: Sequelize.NUMBER,
  rutaimagen: Sequelize.STRING,
  activo: Sequelize.BOOLEAN,
  fecharegistro: Sequelize.DATE,
})

// const ProductoTamaño = connection.define('producto_tamaños', {
//   id_producto: Sequelize.NUMBER,
//   idtamaño: Sequelize.NUMBER,
// })

// ProductoTamaño.belongsTo(ModelTamaño.Tamaño, { foreignKey: 'idtamaño' })
// ProductoTamaño.belongsTo(Product, { foreignKey: 'id_producto' })

Product.belongsTo(ModelCategoria.Category, { foreignKey: 'idcategoria' })
Product.belongsTo(ModelColor.Sabor, { foreignKey: 'idsabor' })
Product.belongsTo(ModelTamaño.Tamaño, { foreignKey: 'idtamaño' })

// Product.hasMany(ProductoTamaño, { foreignKey: 'idproducto' })



module.exports = { Product /*ProductoTamaño*/ };