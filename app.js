//requerinho ferramentas
const bodyParser = require("body-parser");
const Express = require("express");
const app = Express();
const ejs = require('ejs')

const db = require('./database.js')

//pontuação
 let soraia = 8;
 let juan = -7;

//timer
var h,m,s = 0;
h = 23;
m = 59
s = 59
setInterval(() => {
    s -= 1;
    if(s == 0) {
        s = 59;
        m -= 1;
        if(m == 0) {
            m = 59;
            h -= 1;
            if(h == 0) {
                h = 24;
            }
        }
    }
    if(h == 6 && m == 59 && s == 59) { relacaoPontos(); }

}, 1000);
    
async function relacaoPontos()
{

    let a = await db.query("SELECT * FROM soraia");
    let b = await db.query("SELECT * FROM juan");
    let aB = -8;
    let bB = -9;
    
    for(let i = 0; i < a.rows.length; i++) { 

        if(a.rows[i].feito == 'sim') { aB += a.rows[i].pontos }

    }

    for(let i = 0; i < b.rows.length; i++) { 

        if(b.rows[i].feito == 'sim') { bB += b.rows[i].pontos }

    }

    soraia += aB;
    juan += bB;

}

//database
async function dbConect()
{
    setInterval(() => {

        db.connect()
        .then(console.log('Banco conectado'))
        let b = db.query("SELECT * FROM soraia")
        console.log(b.rows)
        
    }, 60000);
    
    
    //await db.query('CREATE TABLE soraia(tarefas VARCHAR(100), id INT, Feito VARCHAR(10), pontos INT)')
    
    //await db.query('CREATE TABLE juan(tarefas VARCHAR(100), id INT, Feito VARCHAR(10), pontos INT)')
    
    //await db.query('CREATE TABLE logins(login VARCHAR(100), senha VARCHAR(100))')

    //await db.query("CREATE TABLE registros(data VARCHAR(100), tarefa VARCHAR(100), pessoa VARCHAR(100), feito VARCHAR(100))")


    //await db.query("INSERT INTO logins(login, senha) VALUES('soraia', 'pipoca1')")
    //await db.query("INSERT INTO logins(login, senha) VALUES('juan', 'pipoca2')")


    //await db.query("INSERT INTO juan(tarefas, id, Feito, pontos) VALUES('Passar pano', 1,'nao', 2)")
    //await db.query("INSERT INTO juan(tarefas, id, Feito, pontos) VALUES('Arrumar o quarto da mãe', 2,'nao', 1)")
    //await db.query("INSERT INTO juan(tarefas, id, Feito, pontos) VALUES('Tirar o lixo', 3,'nao', 0.5)")
    //await db.query("INSERT INTO juan(tarefas, id, Feito, pontos) VALUES('Quintal', 4,'nao', 2)")
    //await db.query("INSERT INTO juan(tarefas, id, Feito, pontos) VALUES('Recolher a roupa', 5,'nao', 1)")
    //await db.query("INSERT INTO juan(tarefas, id, Feito, pontos) VALUES('Dobrar a roupa', 6,'nao', 1.5)")


    

    //await db.query("INSERT INTO soraia(tarefas, id, Feito, pontos) VALUES('Arrumar o quarto', 7,'nao', 1)")
    //await db.query("INSERT INTO soraia(tarefas, id, Feito, pontos) VALUES('Arrumar a sala', 8,'nao', 1)")
    //await db.query("INSERT INTO soraia(tarefas, id, Feito, pontos) VALUES('Quintal', 9,'nao', 2)")
    //await db.query("INSERT INTO soraia(tarefas, id, Feito, pontos) VALUES('Lavar a louça', 10,'nao', 1)")
    //await db.query("INSERT INTO soraia(tarefas, id, Feito, pontos) VALUES('Lavar a roupa', 11,'nao', 1.5)")
    //await db.query("INSERT INTO soraia(tarefas, id, Feito, pontos) VALUES('Estender a roupa', 12,'nao', 0.5)")

}
dbConect();


//body_Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//ejs
app.set('view engine', 'ejs')


//Static
app.use(Express.static(__dirname + "/Front"))



//rotas
app.get("/", (req,res) => {

    res.render(__dirname + '/Front/login.ejs');

});
app.post('/login', (req,res) => {

    let Login = req.body.login;
    let Senha = req.body.senha;
    let e = false;
    
    async function sORn()
    {
        let a = await db.query('SELECT * FROM logins')
        for(let i = 0; i < a.rows.length; i++) { if(a.rows[i].Login == Login || a.rows[i].senha == Senha) { e = true; } }
        result();
    }
    sORn();

    async function result()
    {

        if(e == true){ 
            let b = await db.query("SELECT * FROM " + req.body.login)
            res.send(b.rows)
    
        }else{ return };

    }

});
app.post('/aiponfwaifjnawofn', (req,res) => {
    let r = new Date();
    let d = (r.getDay() + '/');
    d += (r.getMonth() + '/');
    d += (r.getFullYear() + ' ');
    d += (r.getHours() + ':' + r.getMinutes() + ':' + r.getSeconds());


    db.query("UPDATE " + req.body.pessoa + " SET feito = '" + req.body.feito + "' WHERE ID = " + req.body.tarefa + "");
    db.query("INSERT INTO registros(data, tarefa, pessoa, feito) VALUES('" + d + "', '" + req.body.tarefa + "', '" + req.body.pessoa + "', '" + req.body.feito + "')")

});
app.post('/timer', (req,res) => {

    let g = {

        horas: h,
        minutos: m,
        segundos: s

    }

    res.send(g);

});
app.post('/registros', (req,res) => {

    async function obtRegistros()
    {
        
        let d = await db.query("SELECT * FROM registros WHERE pessoa = '" + req.body.pessoa + "'");
        res.send(d.rows)

    }
    obtRegistros();

});
app.post("/pontos", (req,res) => {


    if(req.body.pessoa == 'soraia') {
        let v = {
            pontos: soraia,
        }
        res.send(v)
    };
    if(req.body.pessoa == 'juan') { 
        let v = {
            pontos: juan,
        }
        res.send(v)
    };

});

//listen
app.listen(4000, () => {console.log("Rodando!!!")});
