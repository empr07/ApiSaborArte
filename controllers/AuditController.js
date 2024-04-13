const { Audit } = require('../models/AuditModel')
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const get = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const filters = request.query
    Audit.findAll({
        where: filters,
        order: [['id', 'DESC']]
    })
        .then(entities => {
            const entitiesWithCorrectTimezone = entities.map(entity => {
                const modifiedEntity = { ...entity.toJSON() };
                modifiedEntity.createdAt = new Date(new Date(modifiedEntity.createdAt).getTime() - (6 * 60 * 60 * 1000)); // Restar 6 horas
                return modifiedEntity;
            });
            response.json(entitiesWithCorrectTimezone);
        })
        .catch(err => {
            console.log(err)
            response.status(500).send('Error consultando los datos');
        })

}

module.exports = {
    get,
};
