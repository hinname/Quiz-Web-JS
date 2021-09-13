var configuracoes = {
    iniciado: false,
    tempo: 10,
    pontos: 0,
    quantidadePerguntas: 0,
    maxQuantidadePerguntas: 5,
    perguntaAtual: undefined
}
//Pergunta dps de respondida, sai do array
var perguntasExcluidas = []

function embaralhar(array) {

  let indexAtual = array.length - 1
  

  for (indexAtual; indexAtual > 0; indexAtual--) {

    let indexAleatorio = Math.floor(Math.random() * (indexAtual + 1))
    let temp = array[indexAtual]
    array[indexAtual] = array[indexAleatorio]
    array[indexAleatorio] = temp
  }

  return array
}

function getPergunta(){

    if(perguntas[0].respondida == true) {
      perguntasExcluidas.push(perguntas[0])
      perguntas.shift()
    }


    return perguntas[0];
}


function gerarPergunta(){

    if(configuracoes.quantidadePerguntas >= configuracoes.maxQuantidadePerguntas){
        // alert("Você fez: ", configuracoes.pontos, "Pontos");
        // alert("Você fez: " + configuracoes.pontos);
        // alert("Você fez: " + configuracoes.pontos + " Pontos");
        // alert(`Você fez: ${configuracoes.pontos} Pontos`);
        //alert(`Jogo finalizado, você acertou ${configuracoes.pontos} perguntas`);
        configuracoes.iniciado = false;


        document.querySelector(".quiz").style.display = "none"
        document.querySelector(".reiniciar").style.visibility = "visible"

        document.querySelector(".resultado h3").style.visibility = "visible"
        document.querySelector(".resultado h3").innerHTML = `Jogo finalizado, você acertou ${configuracoes.pontos} perguntas`;

        clearInterval(tempo);

        //console.log(tempo)

        return;
    }

    var retorno = getPergunta();

    //console.log(retorno)

    configuracoes.tempo = 10;
    configuracoes.quantidadePerguntas++;

    document.querySelector(".quiz .tempo h3").innerHTML = "10";

    document.querySelector(".quiz .pergunta h2").innerHTML = retorno.pergunta;
    
    document.querySelector(".quiz .respostas").innerHTML = "";

    retorno.respostas = embaralhar(retorno.respostas)

    for(resposta of retorno.respostas){
        document.querySelector(".quiz .respostas").innerHTML += `<button onclick="tentarResposta('${resposta}')">${resposta}</button>`;
    }

    retorno.respondida = true;

    configuracoes.perguntaAtual = retorno;

}


var tempo = setInterval(function(){

    console.log("Tempo rodando");

    if(configuracoes.iniciado){
        configuracoes.tempo--;
        //console.log(configuracoes.tempo);

        document.querySelector(".quiz .tempo h3").innerHTML = configuracoes.tempo;

        if(configuracoes.tempo <= 0){
            console.log("Nova pergunta!");
            gerarPergunta();
            return;
        }
    }

}, 1000);

function reiniciarTempo() {
  tempo = setInterval(function(){

    console.log("Tempo rodando");

    if(configuracoes.iniciado){
        configuracoes.tempo--;
        //console.log(configuracoes.tempo);

        document.querySelector(".quiz .tempo h3").innerHTML = configuracoes.tempo;

        if(configuracoes.tempo <= 0){
            console.log("Nova pergunta!");
            gerarPergunta();
            return;
        }
    }

  }, 1000);
}


function tentarResposta(resposta){
    if(!configuracoes.iniciado){
        alert("Jogo já está finalizado, não dá pra jogar..");
        return;
    }

    if(configuracoes.perguntaAtual.resposta == resposta){
        configuracoes.pontos++;
        alert("Você acertou!");
    }
    else {
        alert("Você errou!");
    }

    gerarPergunta();
}

function reiniciarVar() {
  configuracoes.pontos = 0
  configuracoes.quantidadePerguntas = 0
  configuracoes.perguntaAtual = undefined
}


function iniciar(){

    if(configuracoes.iniciado){
        alert("Jogo já está iniciado, não dá mais pra voltar!")
        return;
    }

    if(perguntasExcluidas.length > 0) {
      reiniciarVar()
      reiniciarTempo()
      document.querySelector(".resultado h3").style.visibility = "hidden"
      for(pergunta of perguntasExcluidas) {
        perguntas.push(pergunta)
      }
    }

    embaralhar(perguntas)
    
    gerarPergunta();
    
    configuracoes.iniciado = true;


    document.querySelector(".quiz").style.display = "block";
    document.getElementById('start').style.display = "none";

    document.querySelector(".reiniciar").style.visibility = "hidden"
}