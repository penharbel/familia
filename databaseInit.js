
const { Client } = require('pg')
 
const client = new Client({
    host: 'dpg-cp9fsdcf7o1s73a03m70-a',
    port: 5432,
    user: 'criancas_user',
    password: 'AbLCJ4Pu8dcH0GIrnRGDnkUpTyYJXAki',
})



module.exports = client;