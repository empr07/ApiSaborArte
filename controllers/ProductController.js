const { Product, ProductoTamaño } = require('../models/ProductModel')
const { Category } = require('../models/CategoryModel');
const { Sabor } = require('../models/SaborModel');
const { Ingrediente } = require('../models/IngredienteModel');
const { Tamaño } = require('../models/TamañoModel');

const { validationResult } = require('express-validator');

const relations = [
  { model: Category, attributes: ['descripcion'] },
  { model: Sabor, attributes: ['sabor'] },
  { model: Ingrediente, attributes: ['nombre'] },
  { model: Tamaño, attributes: ['tipo'] }
]

const get = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const filters = request.query
  Product.findAll({
    where: filters,
    include: relations
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

const create = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  Product.create(request.body).then(
    newEntitie => {
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
  Product.update(
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
  Product.destroy(
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



module.exports = {
  get,
  getById,
  create,
  update,
  destroy
};
