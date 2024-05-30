const { Client } = require('pg')
 
const client = new Client({
    host: 'dpg-cpa8e47109ks73ak0dtg-a',
    port: 5432,
    database: 'criancas_lz22',
    user: 'criancas_lz22_user',
    password: 'ly7t32h6YEC5KCWrw9JvyCPQty8xTpul',
})



module.exports = client;