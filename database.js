const { Client } = require('pg')
 
const client = new Client({
    host: 'localhost',
    port: 8350,
    database: 'crianças',
    user: 'postgres',
    password: 'alpha-mia',
})



module.exports = client;