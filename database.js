const { Client } = require('pg')
 
const client = new Client({
    host: 'dpg-cp9h7n5ds78s73chseug-a',
    port: 5432,
    database: 'crianca',
    user: 'crianca_user',
    password: 'Wl931OxTdpuVTr9xC7xp9gU1iRMUzQwq',
})



module.exports = client;