const { Product, ProductoTamaño } = require("../models/ProductModel")
const { Tamaño } = require("../models/TamañoModel")


const { validationResult } = require('express-validator');

const relations = [{ model: Product, attributes: ['nombre'] }, { model: Tamaño, attributes: ['tipo'] }]


const get = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const filters = request.query
    ProductoTamaño.findAll({
        where: filters,
        include: relations
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
    ProductoTamaño.findByPk(id, { include: relations })
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
    ProductoTamaño.findOne({
        where: {
            id_producto: request.body.id_producto,
            idtamaño: request.body.idtamaño
        }
    }).then(entitie => {
        if (entitie) {
            return response.status(409).json({ errors: 'Already exists a entitie with this data' });
        }
        else {
            ProductoTamaño.create(request.body).then(
                newEntitie => {
                    response.status(201).json(newEntitie)
                }
            )
                .catch(err => {
                    response.status(500).send(err);
                })
        }
    })

}


const destroy = (request, response) => {
    const id = request.params.id;
    ProductoTamaño.destroy(
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
    destroy
};
