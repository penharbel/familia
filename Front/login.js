var ids = 0;
var divs = new Array();
var crionça = '';
var timer = 0;

function Cdiv(task, confirmacao, id)
{
    let e = document.createElement('div');
    e.setAttribute('class', 'MainDiv');
    e.setAttribute('id', ids)

    let a = '';
        a += '<h2 class="DivH2">' + task + '</h2>';
        a += '<button class="DivBtn" id="' + (e.id + 1) +'">✅</button>';
    e.innerHTML = a;

    document.getElementById("mainn").appendChild(e);
    if(confirmacao == 'sim') { document.getElementById(e.id).style.backgroundColor = 'rgb(126, 218, 131)' }

    divs[e.id] = {

        tarefa: id,
        feito: confirmacao,
        pessoa: crionça

    }

    document.getElementById(e.id + 1).addEventListener('click', () => {

        if(divs[e.id].feito == 'nao') { 

            document.getElementById(e.id).style.backgroundColor = 'rgb(126, 218, 131)';
            divs[e.id].feito = 'sim';

            fetch('https://familia-8n1x.onrender.com/aiponfwaifjnawofn', 
            {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(divs[e.id])
            }).then((response) => { 
            response.json().then((informacoes) => { oraganizandoCdiv(informacoes) })
            })

        }else{  

            document.getElementById(e.id).style.backgroundColor = 'rgb(204, 204, 204)';
            divs[e.id].feito = 'nao';
            fetch('https://familia-8n1x.onrender.com/aiponfwaifjnawofn', 
            {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(divs[e.id])
            }).then((response) => { 
            response.json().then((informacoes) => { oraganizandoCdiv(informacoes) })
            })
        }   

    }, false)
    ids++;
}

async function ObterInfo(log, sen)
{

    document.getElementById("DivlogForm").style.display = 'none';

    crionça = log;
    document.getElementById("H1Header").innerHTML = log;

    let e = { 

        login: log,
        senha: sen,

    };

    await fetch('https://familia-8n1x.onrender.com/login',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(e)
    }).then((response) => { 
        response.json().then((informacoes) => { oraganizandoCdiv(informacoes) })
    })

}

function oraganizandoCdiv(objetos)
{

    for( let i = 0; i < objetos.length; i++ ) { Cdiv( objetos[i].tarefas, objetos[i].feito, objetos[i].id ); }

}

function criandoregistro(objetos)
{

    for(let i = 0; i < objetos.length; i++) {criarRegistro(objetos[i])}

}

function criarRegistro(registro)
{

    let E = document.createElement('div');
    E.setAttribute('class', 'registros');

    let b = document.createElement('h2');
    b.setAttribute('class', 'regish2');
    b.innerHTML = registro.data;

    let c = document.createElement('p');
    c.setAttribute('class', 'regisp');
    c.innerHTML = registro.feito

    E.appendChild(b);
    E.appendChild(c);

    document.getElementById("divpoints").appendChild(E)

}


window.addEventListener("load", () => {


    document.getElementById("btnform").addEventListener('click', () => {

        let a = document.getElementById('Login').value;
        let b = document.getElementById('Senha').value;
        ObterInfo(a, b);
    
    }, false)

    document.getElementById("BtnHeader").addEventListener('click', () => {

        document.getElementById("Divinfo").style.display = 'flex';
        let aS = crionça.toLowerCase();

        let a = {

            pessoa: aS,

        }

        let b = {

            pessoa: crionça,

        }

        async function pontos()
        {

            await fetch('https://familia-8n1x.onrender.com/pontos',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(a)
            }).then((response) => { 
                response.json().then((informacoes) => { 

                    let y = '<div id="points">';
                    y += '<h1 style="margin: 0px;">Pontos</h1>';
                    y += '<h2 style="margin: 0px; color: green;" id="pontuação">'+ informacoes.pontos +'</h2>';
                    y += ' </div>';

                    document.getElementById("divpoints").innerHTML = y;

                })
            })

        }
        pontos();

        async function registrospost()
        {

            await fetch('https://familia-8n1x.onrender.com/registros',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(b)
            }).then((response) => { 
                response.json().then((informacoes) => { 

                    criandoregistro(informacoes);

                })
            })

        }
        registrospost();

    })


    document.getElementById("Divinfo").addEventListener("click", () => {

        document.getElementById("Divinfo").style.display = "none";

    })

    

}, false)

setInterval(() => {
    
    const dataHora = new Date();
      const opcoes = {
        timeZone: 'America/Sao_Paulo',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const dataHoraBrasil = dataHora.toLocaleString('pt-BR', opcoes);
      document.getElementById("horario").innerHTML = dataHoraBrasil;

}, 1000);

