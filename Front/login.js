var ids = 0;
var tarefas = new Array();
var crionça = '';
var timer = 0;

function Cdiv(task)
{
    console.log(task)
    let t;
    let d;
    if(task.definisao == 'continua')
    {

        d = document.getElementById("mainn");
        t = document.createElement('div');

        let a = document.createElement('div')
        let e = document.createElement('h2')
        let i = document.createElement('button')
        let AA = document.createElement('div')
        let Ab = document.createElement('div')
        let Ac = document.createElement('div')
        let ABa = document.createElement('h1')
        let ABb = document.createElement('p')
        let ACa= document.createElement('button')
        let ACb= document.createElement('button')

        AA.setAttribute('class', 'taskINFO');
        Ab.setAttribute('class', 'INFOS');
        Ac.setAttribute('class', 'INFOS');
        ABb.style.textAlign = 'center';
        ABb.innerHTML = 'nenhuma descrição, desculpe';
        ACa.setAttribute('class', 'btnTASK');
        ACa.setAttribute('id', task.nome + 'dapdjaiowjdawiod')
        ACa.style.backgroundColor = 'rgba(207, 0, 0, 0.726)';
        ACa.innerHTML = 'Não Feito';
        ACb.setAttribute('class', 'btnTASK');
        ACb.setAttribute('id', task.nome + '213kr90w8ejfgw')
        ACb.style.backgroundColor = 'rgba(0, 0, 140, 0.726)'
        ACb.innerHTML = 'Feito';
        a.setAttribute('id', task.nome + 'Z');
        a.setAttribute('class', 'MonoDiv');
        t.setAttribute('id', task.nome);
        t.setAttribute('class', 'MainDiv');
        e.setAttribute('class', 'DivH2');
        e.setAttribute('id', task.nome + 'A');
        e.innerHTML = task.nome;
        i.setAttribute('class', 'DivBtn');
        i.innerHTML = '🡳';

        Ac.appendChild(ACa);
        Ac.appendChild(ACb);
        Ab.appendChild(ABa);
        Ab.appendChild(ABb);
        AA.appendChild(Ab);
        AA.appendChild(Ac);
        t.appendChild(e);
        t.appendChild(i);
        a.appendChild(t);
        a.appendChild(AA);

        d.appendChild(a);

        if(task.feito == 'sim')
        {

            ABa.innerHTML = 'Feito'
            let n = 300;
            let g = setInterval(() => {
                n--;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(161, 0, 161) 10%,  rgb(0, 0, 172) ' + n + '%)';
                if(n <= 110)
                {
                    clearInterval(g);
                }
            }, 10);
            
        } if(task.feito == 'nao')
        {
            ABa.innerHTML = 'Incompleto'
            let n = 300;
            let g = setInterval(() => {

                n--;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(161, 0, 161) 10%,  rgb(172, 0, 0) ' + n + '%)';
                if(n <= 110)
                {

                    clearInterval(g);

                }

            }, 10);

        }

        document.getElementById(ACa.id).addEventListener('click', () => {
            if(task.feito == 'nao')
            {

                return;

            }else{

                task.feito = 'nao'

            }
            ABa.innerHTML = 'Incompleta';
            
            let n = 110;
            let g = setInterval(() => {

                n++;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(161, 0, 161) 10%,  rgb(0, 0, 140) ' + n + '%)';
                if(n >= 300)
                {

                    clearInterval(g);
                    let b = setInterval(() => {
                        n--;
                        document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(161, 0, 161) 10%,  rgb(172, 0, 0) ' + n + '%)';
                        if(n <= 110)
                        {

                            clearInterval(b);

                        }
                    }, 10);
                    
                }

            }, 10)

            fetch('http://localhost:4000/tarefas',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(task)
            })

        });

        document.getElementById(ACb.id).addEventListener('click', () => {
            
            if(task.feito == 'sim')
            {

                return;

            }else{

                task.feito = 'sim'

            }
            ABa.innerHTML = 'Feita';
            
            let n = 110;
            let g = setInterval(() => {

                n++;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(161, 0, 161) 10%,  rgb(172, 0, 0) ' + n + '%)';
                if(n >= 310)
                {

                    clearInterval(g);
                    let b = setInterval(() => {
                        n--;
                        document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(161, 0, 161) 10%,  rgb(0, 0, 140) ' + n + '%)';
                        if(n <= 110)
                        {

                            clearInterval(b);

                        }
                    }, 10);
                    
                }

            }, 10)

            fetch('http://localhost:4000/tarefas',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(task)
            })

        });

        document.getElementById(t.id).addEventListener('click', () => {

            let l = 0;
            let Ll = 0;
            if(a.style.height.replace(/px/, '') <= 80)
            {
                l = 80
                Ll = 3;

            } else if(a.style.height.replace(/px/, '') >= 300)
            {
                l = 300
                Ll = -3;
                AA.style.display = 'none';

            }
            
            let h = setInterval(() => {
            
                l += Ll;
                a.style.height = l + 'px';
                if(l >= 300)
                {

                    AA.style.display = 'flex'
                    clearInterval(h);

                } else if(l <= 80)
                {

                    clearInterval(h);

                }

            }, 5);

        });

    } else if(task.definisao == 'extra')
    {

        
        d = document.getElementById("extras");
        t = document.createElement('div');

        let p = document.createElement('div')
        let o = document.createElement('h5')
        let u = document.createElement('p')

        let a = document.createElement('div')
        let e = document.createElement('h2')
        let i = document.createElement('button')
        let AA = document.createElement('div')
        let Ab = document.createElement('div')
        let Ac = document.createElement('div')
        let ABa = document.createElement('h1')
        let ABb = document.createElement('p')
        let ACa = document.createElement('button')
        let ACb = document.createElement('button')
        let ACc = document.createElement('button')

        AA.setAttribute('class', 'taskINFO');
        AA.setAttribute('id', task.nome + 'doawpodawpodjaw');
        Ab.setAttribute('class', 'INFOS');
        Ac.setAttribute('class', 'INFOS');
        ABb.style.textAlign = 'center';
        ABb.innerHTML = 'nenhuma descrição, desculpe';
        ACa.setAttribute('class', 'btnTASK');
        ACa.setAttribute('id', task.nome + 'dapdjaiowjdawiod')
        ACa.style.backgroundColor = 'rgba(207, 0, 0, 0.726)';
        ACa.innerHTML = 'Não Feito';
        ACb.setAttribute('class', 'btnTASK');
        ACb.setAttribute('id', task.nome + '213kr90w8ejfgw')
        ACb.style.backgroundColor = 'rgba(0, 0, 140, 0.726)'
        ACb.innerHTML = 'Feito';
        ACc.setAttribute('class', 'btnTASK');
        ACc.setAttribute('id', task.nome + 'awiofjaoif09')
        ACc.style.backgroundColor = 'rgba(172, 184, 0, 0.726)'
        ACc.innerHTML = 'Fazendo';
        a.setAttribute('id', task.nome + 'Z');
        a.setAttribute('class', 'MonoDiv');
        t.setAttribute('id', task.nome);
        t.setAttribute('class', 'MainDiv');
        e.setAttribute('class', 'DivH2');
        e.setAttribute('id', task.nome + 'A');
        e.innerHTML = task.nome;
        i.setAttribute('class', 'DivBtn');
        i.innerHTML = '🡳';
        p.setAttribute('class', 'divfeito')
        o.innerHTML = 'Feito por'
        o.setAttribute('class', 'extrapessoa')
        u.innerHTML = task.trocar;
        u.setAttribute('class', 'extrapessoa')

        Ac.appendChild(ACa);
        Ac.appendChild(ACc);
        Ac.appendChild(ACb);
        Ab.appendChild(ABa);
        Ab.appendChild(ABb);
        AA.appendChild(Ab);
        AA.appendChild(Ac);
        t.appendChild(e);
        t.appendChild(p);
        t.appendChild(i);
        a.appendChild(t);
        p.appendChild(o);
        p.appendChild(u);
        a.appendChild(t);
        a.appendChild(AA);

        d.appendChild(a);

        

        if(task.feito == 'sim')
        {

            ABa.innerHTML = 'Feito'
            let n = 300;
            let g = setInterval(() => {
                n--;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(0, 0, 172) ' + n + '%)';
                if(n <= 110)
                {
                    clearInterval(g);
                }
            }, 10);
            
        } 
        if(task.feito == 'nao')
        {
            ABa.innerHTML = 'Incompleto'
            let n = 300;
            let g = setInterval(() => {

                n--;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(172, 0, 0) ' + n + '%)';
                if(n <= 110)
                {

                    clearInterval(g);

                }

            }, 10);

        }
        if(task.feito == 'fazendo')
        {
            ABa.innerHTML = 'Fazendo'
            let n = 300;
            let g = setInterval(() => {

                n--;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(184, 184, 0) ' + n + '%)';
                if(n <= 110)
                {

                    clearInterval(g);

                }

            }, 10);

        }

        document.getElementById(ACa.id).addEventListener('click', () => {

            let Ca = '';
            if(task.feito == 'nao')
            {

                return;

            }else{

                if(task.feito == 'sim')
                {

                    Ca = '0, 0, 172';

                } else if(task.feito == 'fazendo')
                {

                    Ca = '184, 181, 0';

                }
                task.feito = 'nao'

            }
            task.trocar = crionça;
            u.innerHTML = 'ninguem';
            ABa.innerHTML = 'Incompleto';
            
            let n = 110;
            let g = setInterval(() => {

                n++;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(' + Ca + ') ' + n + '%)';
                if(n >= 300)
                {

                    clearInterval(g);
                    let b = setInterval(() => {
                        n--;
                        document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(172, 0, 0) ' + n + '%)';
                        if(n <= 110)
                        {

                            clearInterval(b);

                        }
                    }, 10);
                    
                }

            }, 10)

            fetch('http://localhost:4000/tarefas',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(task)
            })

        });

        document.getElementById(ACb.id).addEventListener('click', () => {

            let Ca = '';
            if(task.feito == 'sim')
            {

                return;

            }else{

                if(task.feito == 'nao')
                {

                    Ca = '172, 0, 0';

                } else if(task.feito == 'fazendo')
                {

                    Ca = '184, 181, 0';

                }
                task.feito = 'sim'

            }
            task.trocar = crionça;
            u.innerHTML = crionça;
            ABa.innerHTML = 'Feita';
            
            let n = 110;
            let g = setInterval(() => {

                n++;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(' + Ca + ') ' + n + '%)';
                if(n >= 310)
                {

                    clearInterval(g);
                    let b = setInterval(() => {
                        n--;
                        document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(0, 0, 140) ' + n + '%)';
                        if(n <= 110)
                        {

                            clearInterval(b);

                        }
                    }, 10);
                    
                }

            }, 10)

            fetch('http://localhost:4000/tarefas',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(task)
            })

        });

        document.getElementById(ACc.id).addEventListener('click', () => {

            let Ca = '';
            if(task.feito == 'fazendo')
            {

                return;

            }else{

                if(task.feito == 'nao')
                {

                    Ca = '172, 0, 0';

                } else if(task.feito == 'sim')
                {

                    Ca = '0, 0, 140';

                }
                task.feito = 'fazendo'

            }
            task.trocar = crionça;
            u.innerHTML = crionça;
            ABa.innerHTML = 'Fazendo';
            
            let n = 110;
            let g = setInterval(() => {

                n++;
                document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(' + Ca + ') ' + n + '%)';
                if(n >= 310)
                {

                    clearInterval(g);
                    let b = setInterval(() => {
                        n--;
                        document.getElementById(t.id).style.background = 'linear-gradient(90deg, rgb(172, 98, 0) 10%,  rgb(184, 184, 0) ' + n + '%)';
                        if(n <= 110)
                        {

                            clearInterval(b);

                        }
                    }, 10);
                    
                }

            }, 10)

            fetch('http://localhost:4000/tarefas',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(task)
            })

        });

        document.getElementById(t.id).addEventListener('click', () => {

            let l = 0;
            let Ll = 0;
            if(a.style.height.replace(/px/, '') <= 80)
            {
                l = 80;
                Ll = 3;

            } else if(a.style.height.replace(/px/, '') >= 300)
            {
                l = 300;
                Ll = -3;
                AA.style.display = 'none';

            }
            
            let h = setInterval(() => {
            
                l += Ll;
                a.style.height = l + 'px';
                if(l >= 300)
                {

                    AA.style.display = 'flex';
                    clearInterval(h);

                } else if(l <= 80)
                {

                    clearInterval(h);

                }

            }, 5);

        });

    }

}

async function ObterInfo(log, sen)
{

    crionça = log;
    document.getElementById("DivlogForm").style.display = 'none';    
    document.getElementById("H1Header").innerHTML = log;

    let e = { 

        login: log,
        senha: sen,

    };

    setInterval(() => {

        async function tasks()
        {

            fetch('http://localhost:4000/login',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(e)
            }).then((response) => { 
                response.json().then((informacoes) => { 
    
                    for(let i = 0; i < informacoes.length; i++)
                    {
    
                        tarefas[i] = informacoes[i];
    
                    }
    
                })
            })

        }
        tasks();
    
    }, 1000);

    setTimeout(() => {

        document.getElementById("mainn").innerHTML = '<h1>TAREFAS ATUAIS</h1>';
        document.getElementById("extras").innerHTML = '<h1>TAREFAS EXTRAS</h1>';
        for( let i = 0; i < tarefas.length; i++ ) { 

            Cdiv( tarefas[i] )

        }
        
    }, 1500);

    

    setInterval(() => {
        
    }, 1000);

    

}

var control = 0;
function animatetoDown(o, n, v, i, t)
{
    control = i;
    let p = setInterval(() => {
        let l = o.style.height.replace(/px/, '');
        n.style.top = (l - 25) + 'px';

        control += v;
        o.style.height = control + "px";
        if(control == t)
        {

            control = 0;

            if(t > 500)
            {

                document.getElementById("canvapts").style.display = 'flex';
                document.getElementById("h1pts").style.display = 'flex';

            }else{

                document.getElementById("canvapts").style.display = 'none';
                document.getElementById("h1pts").style.display = 'none';

            }
            

            clearInterval(p);
            
        }

    }, 1); 

}

function bolha()
{

    let h = document.getElementById("bolhadiv");
    let g = document.createElement('img');
    let w = (Math.random() * 600) - 200;
    let t = Math.random() * 500;
    g.setAttribute('class', 'bolhas');
    g.style.height = t + 'px';
    g.style.width = t + 'px';
    g.style.left = w + 'px';
    g.src = 'Imagens/bolha.png'
    h.appendChild(g)

    let p = -300;

    let n = setInterval(() => {
        
        let y = g.style.top.replace(/px/, '')
        p += 1;
        g.style.top = p + 'px';
        if(y > 1000)
        {

            h.removeChild(g);
            clearInterval(n)

        }

    }, 10);

}

function toPts(pts)
{

    let c = document.getElementById("canvapts");

    let ctx = c.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 400, pts)

}


window.addEventListener("load", () => {


    document.getElementById("btnform").addEventListener('click', () => {

        let a = document.getElementById('Login').value;
        let b = document.getElementById('Senha').value;
        ObterInfo(a, b);
        let i = document.getElementById("Divinfo");
        document.getElementById("boridy").removeChild(i);

    }, false);


    document.getElementById("BtnHeader").addEventListener("click", () => {

        let i = document.getElementById("headerI");
        let n = document.getElementById("BtnHeader");
        control = 100;
        let h = i.style.height.replace(/px/, '')
        if(h >= 300)
        {
            animatetoDown(i, n, -3, 700, 100);

        } else if(h <= 100)
        {

            animatetoDown(i, n, 3, 100, 700);

        }

        let e = {

            pessoa: crionça,
    
        }
    
        fetch('http://localhost:4000/pontos',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(e)
        }).then((response) => {
    
            response.json().then((pontos) => { 
                document.getElementById("h1pts").innerHTML = pontos[0].pontuasao ;
                toPts(pontos[0].pontusasao);
            })
    
        })
        

    });


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

setInterval(() => {
    
    bolha();

}, 700);
