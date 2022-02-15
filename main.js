// escondendo o botão de pause (não funcionou com css 🤷‍♂️)
document.querySelector('.botao-pause').style.display = 'none';

// array com as musicas
let musicas = [
  {titulo:'This is Not a Christmas Song', artista:'NEFFEX', src:'musics/This is Not a Christmas Song - NEFFEX.mp3', img:'images/Christmas.jpg'},

  {titulo:'Sharp', artista:'Jeremy Korpas', src:'musics/Sharp - Jeremy Korpas.mp3', img:'images/Sharp.jpg'},

  {titulo:'I Just Wanna Be Great', artista:'NEFFEX', src:'musics/I Just Wanna Be Great - NEFFEX.mp3', img:'images/guitar.jpg'},

  {titulo:'Dreaming On', artista:'NEFFEX', src:'musics/Dreaming On - NEFFEX.mp3', img:'images/DreamingOn.jpg'},
];

// indicando qual a posição dos objetos do array
let indexMusica = 0;

// pegando a tag "audio"
let musica = document.querySelector('audio');

// pegando a imagem do álbum
let imagem = document.querySelector('img');

// pegando o nome da música
let nomeMusica = document.querySelector('.descricao h2');

// pegando o nome do artista
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// pegando a class "fim"
let duracaoMusica = document.querySelector('.fim');
// mostrando o tempo total da música e transformando em minutos
//duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// Eventos //
// criando um evento com o botão play
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

// criando um evento com o botão de pause
document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

// pregresso da música
musica.addEventListener('timeupdate', atualizarBarra);

// criando um evento para voltar pra música anterior (usando função anônima)
document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 3;
  }
  renderizarMusica(indexMusica);
});

// criando um evento para avançar a música (usando função anônima)
document.querySelector('.proxima').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > 3){
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

// Funções //

// função que realiza a troca da música com todas as suas infomações
function renderizarMusica(index){
  musica.setAttribute('src', musicas[index].src);
  musica.addEventListener('loadeddata', () => {
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
  });  
}

// função que dar play na música
function tocarMusica(){
  musica.play();
  document.querySelector('.botao-pause').style.display = 'block';
  document.querySelector('.botao-play').style.display = 'none';
}

// função para pausar a música
function pausarMusica(){
  musica.pause();
  document.querySelector('.botao-pause').style.display = 'none';
  document.querySelector('.botao-play').style.display = 'block';
}

// função para atualizar a barra e o tempo da música
function atualizarBarra(){
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

// função para transfomar os segundos em minutos junto com o progresso da música
function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10){
    campoSegundos = '0' + campoSegundos;
  }

  return campoMinutos+':'+campoSegundos;
}

