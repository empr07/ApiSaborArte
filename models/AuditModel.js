const Sequelize = require('sequelize')
const { connection } = require("../config.db");

const Audit = connection.define('audit', {
    user: Sequelize.STRING,
    module: Sequelize.STRING,
    description: Sequelize.STRING,
})

module.exports = { Audit };