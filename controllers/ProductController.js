const { Product, ProductoTamaño } = require('../models/ProductModel')
const { Category } = require('../models/CategoryModel');
const { Sabor } = require('../models/SaborModel');
const { Tamaño } = require('../models/TamañoModel');
const { connection } = require("../config.db");
const { Op } = require("sequelize");

const { validationResult } = require('express-validator');
const { DetalleCompra } = require('../models/DetalleCompraModel');
const { registerAudit } = require('../helpers/AuditOperations');

const relations = [
  { model: Category, attributes: ['descripcion'] },
  { model: Sabor, attributes: ['sabor'] },
  { model: Tamaño, attributes: ['tipo'] }
]

const get = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const filters = request.query

  if (filters.nombre) {
    filters.nombre = { [Op.like]: `%${filters.nombre ?? ''}%` }
  }

  Product.findAll({
    where: filters,
    include: relations,
    order: [
      ['id', 'DESC']
    ]
  })
    .then(entities => {
      if (entities.length) {
        entities.forEach(entitie => {
          entitie.precio = parseFloat(entitie.precio)
        });
      }
      response.json(entities);
    })
    .catch(err => {
      response.status(500).send('Error consultando los datos');
    })

}

const getById = (request, response) => {
  const id = request.params.id;
  Product.findByPk(id, { include: relations })
    .then(entitie => {
      if (entitie) {
        entitie.precio = parseFloat(entitie.precio)
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

const getBestSellers = async (req, res) => {
  try {
    const query = `
      SELECT
        dc.idproducto,
        p.nombre,
        SUM(dc.cantidad) as totalVendido
      FROM
        detalle_compras dc
        INNER JOIN compras c ON dc.idcompra = c.id
        INNER JOIN productos p ON dc.idproducto = p.id
      GROUP BY
        dc.idproducto
      ORDER BY
        totalVendido DESC
      LIMIT
        5;
    `;

    const productosMasVendidos = await connection.query(query, {
      replacements: {}, // Reemplaza :userId con el valor real
      type: connection.QueryTypes.SELECT,
    });

    res.json(productosMasVendidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos más vendidos.' });
  }
}

const getLeastSellers = async (req, res) => {
  try {
    const query = `
      SELECT
        dc.idproducto,
        p.nombre,
        SUM(dc.cantidad) as totalVendido
      FROM
        detalle_compras dc
        INNER JOIN compras c ON dc.idcompra = c.id
        INNER JOIN productos p ON dc.idproducto = p.id
      GROUP BY
        dc.idproducto
      ORDER BY
        totalVendido ASC
      LIMIT
        5;
    `;

    const productosMenosVendidos = await connection.query(query, {
      replacements: {}, // Reemplaza :userId con el valor real si es necesario
      type: connection.QueryTypes.SELECT,
    });

    res.json(productosMenosVendidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos menos vendidos.' });
  }
}

const create = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  Product.create(request.body).then(
    newEntitie => {
      registerAudit(request.user, 'Productos', `Registró a ${newEntitie.nombre}`)
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
  Product.findByPk(id)
    .then(entitie => {
      if (entitie) {
        let operation = 'Actualizó'
        if (request.body.activo == 0) {
          operation = 'Dió de baja'
        }
        if (entitie.activo == 0 && request.body.activo == "true") {
          operation = 'Actualizó y dió de alta'
        }
        Product.update(
          request.body
          , {
            where: {
              id: id
            }
          })
          .then(numRowsUpdated => {
            registerAudit(request.user, 'Productos', `${operation} a ${entitie.nombre}`)
            response.status(200).send(`${numRowsUpdated} registro actualizado`);
          })
          .catch(err => {
            response.status(500).send(err);
          });
      }
      else {
        response.status(404).send('Entity not found')

      }
    })

}

const destroy = (request, response) => {
  const id = request.params.id;
  Product.findByPk(id)
    .then(entitie => {
      if (entitie) {
        const name = entitie.nombre
        Product.destroy(
          {
            where: {
              id: id
            }
          }
        ).then(numRowsDeleted => {
          registerAudit(request.user, 'Productos', `Eliminó a ${name}`)
          response.status(200).send(`${numRowsDeleted} registro eliminado`);
        })
          .catch(err => {
            response.status(500).send(err);
          });
      }
      else {
        response.status(404).send('Entity not found')
      }
    })

}



module.exports = {
  get,
  getById,
  getBestSellers,
  getLeastSellers,
  create,
  update,
  destroy
};
