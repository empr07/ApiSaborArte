// const dotenv = require("dotenv");
// dotenv.config();

// const mysql = require('mysql');
// let connection;

// try {
//     connection = mysql.createConnection({
//         host: process.env.DBHOST,
//         user: process.env.DBUSER,
//         password: process.env.DBPASS,
//         database: process.env.DBNAME
//     });
// } catch (error) {
//     console.log("Error al conectar con la base de datos");
// }

// module.exports = {connection};

const Sequelize = require('sequelize')
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('./config.js')

let connection;

if (process.env.DATABASE_URL) {
    connection = new Sequelize(process.env.DATABASE_URL)
}
else {
    connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
    })
}


connection.authenticate()
    .then(() => {
        console.log('Se ha establecido conexión con la base de datos')
    })
    .catch(err => {
        console.log('No se pudo establecer conexión con la base de datos')
    })

module.exports = { connection };