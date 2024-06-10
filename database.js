const { Client } = require('pg')
 
const client = new Client({
    host: 'dpg-cpj4v6uct0pc73843rcg-a',
    port: 5432,
    database: 'familia_668f',
    user: 'familia_668f_user',
    password: 'h1CDaDR6qQRMdScZQJ0ZNfdk3pAmzNlG',
})



module.exports = client;