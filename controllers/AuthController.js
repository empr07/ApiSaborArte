const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel')
const { validationResult } = require('express-validator');


const login = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const data = await User.findOne({ where: { correo: request.body.correo } });
    if (data) {
        const password_valid = request.body.contraseña === data.contraseña
        if (password_valid) {
            const token = jwt.sign({ data }, 'lkjpqjcnporsthmlpqsc', { expiresIn: '24h' });
            if (data.esadministrador) {
                response.status(200).json({ token: token, admin: true });
            }
            else {
                response.status(200).json({ token: token, admin: false });
            }

        }
        else {
            response.status(401).json({ message: 'Credenciales inválidas.' });
        }
    }
    else {
        response.status(401).json({ message: 'Credenciales inválidas.' });
    }
}


const registerAdmin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send(err);
        })
}

const registerNoAdmin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    request.body.esadministrador = false
    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send(err);
        })
}

const updateAdmin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const id = request.query.idusuario;
    User.update(
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


const updateNoAdmin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const id = request.query.idusuario;
    User.update(
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

const getUsers = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const filters = request.query
    User.findAll({
        where: filters,
        order: [
            ['id', 'DESC']
        ]
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err)
            response.status(500).send('Error consultando los datos');
        })
}

const getUserById = (request, response) => {
    const id = request.params.id;
    User.findByPk(id)
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

const destroyUser = (request, response) => {
    const id = request.params.id;
    User.destroy(
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

const getUserByToken = (request, response) => {
    const token = request.headers.authorization.split(' ')[1]
    try {
        const payload = jwt.verify(token, 'lkjpqjcnporsthmlpqsc')

        if (payload) {
            response.json(payload.data)
        }
        else {
            response.status(204).send('Any user logged with this token')
        }
    }
    catch (e) {
        response.status(404).send('Any user logged with this token')

    }

}

module.exports = {
    login,
    registerAdmin,
    registerNoAdmin,
    updateAdmin,
    updateNoAdmin,
    getUsers,
    getUserById,
    destroyUser,
    getUserByToken
};