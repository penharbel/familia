//requerinho ferramentas
const bodyParser = require("body-parser");
const Express = require("express");
const app = Express();

const db = require('./database.js')


//timer
    const opcoes = {
        timeZone: 'America/Sao_Paulo',
        hour: 'numeric',
    };
    const opcoesD = {
        timeZone: 'America/Sao_Paulo',
        day: 'numeric',
    };

    var datahoraH; 
    var datahoraD ;

setInterval(() => {

    const dataHora = new Date();  
    datahoraD = dataHora.toLocaleDateString('pt-BR', opcoesD);
    datahoraH = dataHora.toLocaleString('pt-BR', opcoes);
    async function antedia()
    {

        let o = await db.query("SELECT * FROM dia")

        if(o.rows[0].anterior != datahoraD && datahoraH > 6) { 

            console.log("rodando relação")
            db.query("UPDATE dia SET anterior = " + datahoraD)
            relacaoPontos()

        }

    }
    antedia();
    
    
        
}, 5000);
    
async function relacaoPontos()
{

    let t = await db.query("SELECT * FROM tarefas");
    for(let i = 0; i < t.rows.length; i++)
    {
        console.log(t.rows[i])
        if(t.rows[i].feito == 'nao' && t.rows[i].definisao == 'continua')
        {
            let u = await db.query("SELECT * FROM logins WHERE login = '" + t.rows[i].dono + "'");
            let p = u.rows[0].pontuasao;
            let o = t.rows[i].pontos;
            p -= o;
            await db.query("UPDATE logins SET pontuasao = " + p + " WHERE login = '" + u.rows[0].login + "'");
        } else if(t.rows[i].feito == 'sim' && t.rows[i].definisao == 'extra')
        {
            let u = await db.query("SELECT * FROM logins WHERE login = '" + t.rows[i].trocar + "'");
            let p = u.rows[0].pontuasao;
            let o = t.rows[i].pontos;
            p += o;
            await db.query("UPDATE logins SET pontuasao = " + p + " WHERE login = '" + u.rows[0].login + "'");
            await db.query("UPDATE tarefas SET trocar = 'ninguem' WHERE nome = '" + t.rows[i].nome + "'");
        }

    }

    await db.query("UPDATE tarefas SET feito = 'nao'")

}


//database
async function dbConect()
{

    db.connect()
    .then(console.log('Banco conectado'))

    await db.query("CREATE TABLE dia(anterior INT)")
    await db.query("CREATE TABLE logins(login VARCHAR(100), senha VARCHAR(100), pontuasao INT)")
    await db.query("CREATE TABLE tarefas(nome VARCHAR(100), dono VARCHAR(100), feito VARCHAR(10), pontos INT, definisao VARCHAR(100), tempo INT, tempoemfalta INT, trocar VARCHAR(100))")



    await db.query("INSERT INTO logins(login, senha, pontuasao) VALUES('Soraia', 'Karina-luta', 15)")
    await db.query("INSERT INTO logins(login, senha, pontuasao) VALUES('Juan', 'Pipoca2', -20)")


    await db.query("INSERT INTO dia(anterior) VALUES(0)")

    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Passar pano', 'Juan', 'nao', 2, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Dobrar as roupas', 'Juan', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Tirar o lixo', 'Juan', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Quintal', 'Juan', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Arrumar o quarto da mãe', 'Juan', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Recolher as roupas', 'Juan', 'nao', 1, 'continua', 1, 0, 'ninguem')")

    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Estender as Roupas', 'Soraia', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Lavar as roupas', 'Soraia', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Quintal', 'Soraia', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Arrumar o quarto Nosso', 'Soraia', 'nao', 1, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Lavar a louça', 'Soraia', 'nao', 2, 'continua', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Arrumar a sala', 'Soraia', 'nao', 1, 'continua', 1, 0, 'ninguem')")

    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Guardar a louça', 'ninguem', 'nao', 1, 'extra', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Limpar o fogão', 'ninguem', 'nao', 1, 'extra', 1, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Lavar o banheiro', 'ninguem', 'nao', 3, 'extra', 3, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Organizar o gruarda roupas', 'ninguem', 'nao', 5, 'extra', 30, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Organizar o hack', 'ninguem', 'nao', 1, 'extra', 7, 0, 'ninguem')")
    await db.query("INSERT INTO tarefas(nome, dono, feito, pontos, definisao, tempo, tempoemfalta, trocar) VALUES('Limpar a geladeira', 'ninguem', 'nao', 3, 'extra', 30, 0, 'ninguem')")
}
dbConect();


//body_Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//ejs
app.set('view engine', 'ejs')


//Static
app.use(Express.static(__dirname + "/Front"))
app.use(Express.static(__dirname + "/FrontADM"))


//rotas
app.get("/", (req,res) => {

    res.render(__dirname + '/Front/login.ejs');

});
app.get('/ADM57655', (req,res) => {

    res.render(__dirname + '/FrontADM/ADM.ejs');

});

app.post('/login', (req,res) => {

    async function login()
    {
        
        let l = await db.query("SELECT * FROM logins");
        for(let i = 0; i < l.rows.length; i++)
        {

            if(l.rows[i].login == req.body.login && l.rows[i].senha == req.body.senha)
            {

                let a = await db.query("SELECT * FROM tarefas WHERE dono = '" + l.rows[i].login + "'")
                let b = await db.query("SELECT * FROM tarefas WHERE definisao = 'extra'")
                let c = a.rows.concat(b.rows);
                res.send(c);

            }
            
        }

    }
    login();

});
app.post("/pontos", (req,res) => {
    async function points()
    {
        let p = await db.query("SELECT * FROM logins WHERE login = '" + req.body.pessoa + "'")
        res.send(p.rows)

    }
    points();
});
app.post('/tarefas', (req,res) => {

    async function tasks()
    {
        console.log(req.body)
        if(req.body.trocar != 'ninguem' && req.body.definisao == 'extra')
        {

            let i = await db.query("SELECT * FROM tarefas WHERE nome = '" + req.body.nome + "'")
            if(req.body.trocar == i.rows[0].trocar)
            {

                if(req.body.feito == 'nao')
                {

                    console.log('retirando')
                    await db.query("UPDATE tarefas SET trocar = 'ninguem' WHERE nome = '" + req.body.nome + "'")
                    await db.query("UPDATE tarefas SET feito = '" + req.body.feito + "' WHERE nome = '" + req.body.nome + "'")
                    return;

                }
                await db.query("UPDATE tarefas SET trocar = '" + req.body.trocar + "' WHERE nome = '" + req.body.nome + "'")
                await db.query("UPDATE tarefas SET feito = '" + req.body.feito + "' WHERE nome = '" + req.body.nome + "'")
                return;

            }

            if(i.rows[0].trocar != 'ninguem')
            {
                console.log('essa não kkk')
                return;

            }

            console.log("aceito2")
            await db.query("UPDATE tarefas SET trocar = '" + req.body.trocar + "' WHERE nome = '" + req.body.nome + "'")
            await db.query("UPDATE tarefas SET feito = '" + req.body.feito + "' WHERE nome = '" + req.body.nome + "'")
            
        } else{

            await db.query("UPDATE tarefas SET feito = '" + req.body.feito + "' WHERE nome = '" + req.body.nome + "'")

        }
        

    }
    tasks()
    res.send(JSON.stringify({ nome: 'nada' }))

});
app.post('/altpts', (req,res) => {

    async function ptss()
    {
        let j = await db.query("SELECT * FROM dia");
        if(req.body.pessoa == 'soraia')
        {

            j.rows[0].soraiapts += req.body.pontos;
            db.query('UPDATE dia SET ' + req.body.pessoa + 'pts' +  ' = ' + j.rows[0].soraiapts)

        } else if(req.body.pessoa == 'juan')
        {

            j.rows[0].juanpts += req.body.pontos;
            db.query('UPDATE dia SET ' + req.body.pessoa + 'pts' + ' = ' + j.rows[0].juanpts)

        }
    }
    ptss();

    let e = {

        nada: 'nadinha',

    }
    res.send(JSON.stringify(e))


});

//listen
app.listen(4000, () => {console.log("Rodando!!!")});
