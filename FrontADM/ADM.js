var ids = 0;
var divs = new Array();
var crionça = '';
var timer = 0;

function Cdiv(task, confirmacao, id, pessoa)
{
    let e = document.createElement('div');
    e.setAttribute('class', 'MainDiv');
    e.setAttribute('id', ids)

    let a = '';
        a += '<h2 class="DivH2">' + task + '</h2>';
        a += '<button class="DivBtn" id="' + (e.id + 1) +'">✅</button>';
    e.innerHTML = a;

    document.getElementById(pessoa).appendChild(e);
    if(confirmacao == 'sim') { document.getElementById(e.id).style.backgroundColor = 'rgb(126, 218, 131)' }

    divs[e.id] = {

        tarefa: id,
        feito: confirmacao,
        pessoa: pessoa

    }

    document.getElementById(e.id + 1).addEventListener('click', () => {

        if(divs[e.id].feito == 'nao') { 

            document.getElementById(e.id).style.backgroundColor = 'rgb(126, 218, 131)';
            divs[e.id].feito = 'sim';

            fetch('http://localhost:4000/aiponfwaifjnawofn', 
            {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(divs[e.id])
            })
        }else{  

            document.getElementById(e.id).style.backgroundColor = 'rgb(204, 204, 204)';
            divs[e.id].feito = 'nao';
            fetch('http://localhost:4000/aiponfwaifjnawofn', 
            {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(divs[e.id])
            })
        }   

    }, false)
    ids++;
}

async function ObterInfo(pessoa)
{

    let g = {

        pessoa: pessoa,

    }
    fetch('http://localhost:4000/Ctarefas', 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(g)
    }).then((response) => { 
        response.json().then((informacoes) => {

            oraganizandoCdiv(informacoes, pessoa);

        })
    })

}

function oraganizandoCdiv(objetos, pessoa)
{

    document.getElementById(pessoa).innerHTML = '<h1>' + pessoa + '</h1>';
    for( let i = 0; i < objetos.length; i++ ) { Cdiv( objetos[i].tarefas, objetos[i].feito, objetos[i].id, pessoa ); }

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

async function reqpts(pessoa, pontos)
{

    let i = {

        pessoa: pessoa,
        pontos: pontos

    }
    await fetch('http://localhost:4000/altpts', 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(i)
    })

}


window.addEventListener("load", () => {

    document.getElementById("BtnHeader").addEventListener('click', () => {

        document.getElementById("Divinfo").style.display = 'flex';

    })

    document.getElementById("close").addEventListener("click", () => {

        document.getElementById("Divinfo").style.display = "none";

    })




    document.getElementById("btna").addEventListener("click", () => {

        reqpts('soraia', -1);

    })

    document.getElementById("btnb").addEventListener("click", () => {

        reqpts('soraia', 1);

    })

    document.getElementById("btnc").addEventListener("click", () => {

        reqpts('juan', -1);

    })

    document.getElementById("btnd").addEventListener("click", () => {

        reqpts('juan', 1);

    })

}, false)

async function obtpts(pessoa)
{
    let a = {

        pessoa: pessoa,

    }
    fetch('http://localhost:4000/pontos', 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(a)
    }).then((response) => {

        response.json().then((pts) => {

            document.getElementById(pessoa + "A").innerHTML = pts.pontos

        })

    })

}

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

setInterval(() => {
    
    ObterInfo('soraia');
    ObterInfo('juan');
    obtpts('soraia');
    obtpts('juan');

}, 1000);

