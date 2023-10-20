const { Tamaño } = require('../models/TamañoModel')

const { validationResult } = require('express-validator');

const get = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  const filters = request.query
  Tamaño.findAll({
    where: filters
  })
    .then(entities => {
      response.json(entities);
    })
    .catch(err => {
        console.log(err)
      response.status(500).send('Error consultando los datos');
    })

}

const getById = (request, response) => {
  const id = request.params.id;
  Tamaño.findByPk(id)
    .then(entitie => {
      if (entitie) {
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
  Tamaño.create(request.body).then(
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
  Tamaño.update(
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
  Tamaño.destroy(
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
