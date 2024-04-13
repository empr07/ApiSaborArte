const express = require('express');
const cors = require('cors');
const app = express();
const { PORT } = require("./config");
// Habilitar CORS
app.use(cors());

app.use(express.json({
  limit: '10mb'
}));

var product_routes = require('./routes/ProductRoute');
var category_routes = require('./routes/CategoryRoute');
var sabor_routes = require('./routes/SaborRoute');
var compra_routes = require('./routes/CompraRoute');
var detalle_compras_routes = require('./routes/DetalleCompraRoute');
var ingrediente_routes = require('./routes/IngredienteRoute');
var tamaño_routes = require('./routes/TamañoRoute');
var pago_routes = require('./routes/PagoRoute')
// var producto_tamaños_routes = require('./routes/ProductoTamañoRoute');
var auth_routes = require('./routes/AuthRoute');
var audit_routes = require('./routes/AuditRoute');



app.use('/api', product_routes, category_routes, sabor_routes, compra_routes,
  detalle_compras_routes, ingrediente_routes, tamaño_routes, /*producto_tamaños_routes,*/ pago_routes, auth_routes, audit_routes);

app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;