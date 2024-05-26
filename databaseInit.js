
const { Client } = require('pg')
 
const client = new Client({
    host: 'localhost',
    port: 8350,
    user: 'postgres',
    password: 'alpha-mia',
})



module.exports = client;