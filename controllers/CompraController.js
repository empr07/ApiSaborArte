const { Compra } = require('../models/CompraModel')

const { validationResult } = require('express-validator');
const { DetalleCompra } = require('../models/DetalleCompraModel');
const { User } = require('../models/UserModel');
const { Product } = require('../models/ProductModel');
const { Category } = require('../models/CategoryModel');
const { Sabor } = require('../models/SaborModel');
const { Tamaño } = require('../models/TamañoModel');
const { Pago } = require('../models/PagoModel');

const jwt = require('jsonwebtoken');


const relationsProduct = [
  { model: Category, attributes: ['descripcion'] },
  { model: Sabor, attributes: ['sabor'] },
  { model: Tamaño, attributes: ['tipo'] },
]

const relationsDetalleCompra = [
  { model: Product, attributes: ['nombre'], include: relationsProduct }
]

const relations = [
  { model: DetalleCompra, attributes: ['id', 'cantidad', 'total', 'fechaentrega', 'horaentrega'], include: relationsDetalleCompra },
  { model: User, attributes: ['nombres', 'apellido_p', 'apellido_m', 'correo'] },
  { model: Pago }
]

const get = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const filters = request.query
  Compra.findAll({
    where: filters,
    include: relations,
    order: [
      ['id', 'DESC']
    ]
  })
    .then(entities => {
      if (entities.length) {
        entities.forEach(entitie => {
          entitie.total = parseFloat(entitie.total)
        });
      }
      response.json(entities);
    })
    .catch(err => {
      console.log(err)
      response.status(500).send('Error consultando los datos');
    })
}

const getById = (request, response) => {
  const id = request.params.id;
  Compra.findByPk(id, { include: relations })
    .then(entitie => {
      if (entitie) {
        entitie.total = parseFloat(entitie.total)
        response.json(entitie);
      }
      else {
        response.status(404).send('Recurso no encontrado')
      }
    })
    .catch(err => {
      response.status(500).send('Error al consultar el dato');
    })
}

const create = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const token = request.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, 'lkjpqjcnporsthmlpqsc')
  request.body.idusuario = payload.data.id
  Compra.create(request.body).then(
    newEntitie => {


      request.body.detalles.forEach(detail => {
        DetalleCompra.create({
          idcompra: newEntitie.id,
          idproducto: detail.id,
          cantidad: detail.cantidad,
          fechaentrega: '1990-01-01',
          horaentrega: '12:00',
          total: detail.cantidad * detail.precio
        }).then(e => {
          Product.findByPk(detail.id).then(p => {
            Product.update(
              { stock: p.stock - detail.cantidad }
              , {
                where: {
                  id: detail.id
                }
              })
          })

        })
      })
      const payment = request.body.pago
      Pago.create({
        idcompra: newEntitie.id,
        metodo: payment.metodo,
        totalpagado: payment.totalpagado,
        direccion: payment.direccion,
        pais: payment.pais,
        nombres: payment.nombres,
        apellidos: payment.apellidos,
        telefono: payment.telefono,
        cp: payment.cp,
        calles: payment.calles,
        ciudad: payment.ciudad,
        estado: payment.estado,
      })

      response.status(201).json(newEntitie)
    }
  )
    .catch(err => {
      response.status(500).send(err);
    })
}

const update = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const id = request.params.id;
  Compra.update(
    request.body
    , {
      where: {
        id: id
      }
    })
    .then(numRowsUpdated => {
      response.status(200).send(`${numRowsUpdated} registro actualizado`);
    })
    .catch(err => {
      response.status(500).send(err);
    });
}

const destroy = (request, response) => {
  const id = request.params.id;
  Compra.destroy(
    {
      where: {
        id: id
      }
    }
  ).then(numRowsDeleted => {
    response.status(200).send(`${numRowsDeleted} registro eliminado`);
  })
    .catch(err => {
      response.status(500).send(err);
    });
}

const getByUser = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const filters = request.query
  filters.idusuario = request.query.idusuario

  Compra.findAll({
    where: filters,
    include: relations
  })
    .then(entities => {
      if (entities.length) {
        entities.forEach(entitie => {
          entitie.total = parseFloat(entitie.total)
        });
      }
      response.json(entities);
    })
    .catch(err => {
      console.log(err)
      response.status(500).send('Error consultando los datos');
    })
}

const createByUser = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  request.body.idusuario = request.query.idusuario
  Compra.create(request.body).then(newEntitie => {

    request.body.pago.idcompra = newEntitie.id
    Pago.create(request.body.pago).then(newPago => {
      response.status(201).json(newEntitie)
    })
      .catch(err => {
        response.status(500).send(err);
      })

    request.body.detalles.forEach(detail => {
      DetalleCompra.create({
        idcompra: newEntitie.id,
        idproducto: detail.id,
        cantidad: detail.cantidad,
        fechaentrega: '1990-01-01',
        horaentrega: '12:00',
        total: detail.cantidad * detail.precio
      }).then(e => {
        Product.findByPk(detail.id).then(p => {
          Product.update(
            { stock: p.stock - detail.cantidad }
            , {
              where: {
                id: detail.id
              }
            })
        })

      })
    })


  }
  )
    .catch(err => {
      response.status(500).send(err);
    })
}

module.exports = {
  get,
  getById,
  create,
  update,
  destroy,
  getByUser,
  createByUser,
};
