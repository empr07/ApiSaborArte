const { DetalleCompra } = require('../models/DetalleCompraModel')

const { validationResult } = require('express-validator');

const get = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const filters = request.query
    DetalleCompra.findAll({
        where: filters
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
    DetalleCompra.findByPk(id)
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
    DetalleCompra.create(request.body).then(
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
    DetalleCompra.update(
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
    DetalleCompra.destroy(
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
