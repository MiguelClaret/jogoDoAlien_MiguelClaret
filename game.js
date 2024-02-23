// define as variáveis das medidas da tela
const larguraJogo = 700;
const alturaJogo = 850;

//  define as configurações do game
const config = {
  type: Phaser.AUTO, //Define a renderização com base no navegador
  width: larguraJogo, // define a largura do jogo
  height: alturaJogo, // define a altura do jogo

  // define as funções que serão executadas durante o game
  scene: {
    preload: preload, 
    create: create,
    update: update
  },
  // define a física do game
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true // deixa o hitbox visivel
    }
  }
};

// salva as configurações do game em uma variável
const game = new Phaser.Game(config);

//criação de variáveis
var alien;
var teclado;
var fogo;
var plataforma1
var plataforma2
var plataforma3
var moeda;
var pontuacao = 0
var placar


function preload() {
  // carrega as imagens do game
  this.load.image('background', 'assets/bg.png');
  this.load.image('player', 'assets/alienigena.png')
  this.load.image('turbo', 'assets/turbo.png');
  this.load.image('plataforma_tijolo', 'assets/tijolos.png')
  this.load.image('moeda', 'assets/moeda.png')
  this.load.image('plataforma_tijolo2', 'assets/tijolos.png')
  this.load.image('plataforma_tijolo3', 'assets/tijolos.png')
}

function create() {

  this.add.image(larguraJogo / 2, alturaJogo / 2, 'background'); // add o fundo na tela

  fogo = this.add.sprite(0, 0, 'turbo') //atribua a 'fogo' a sprite do turbo e seta sua origem
  fogo.setVisible(false) // deixa o turbo invisivel

  alien = this.physics.add.sprite(larguraJogo / 2, 0, 'player') // atribui a 'alien' a sprite do boneco e sua origem 
  alien.setCollideWorldBounds(true) // coloca colisões do alien com a tela

  teclado = this.input.keyboard.createCursorKeys(); // add os inputs do teclado
  // add física estática as imagens
  plataforma1 = this.physics.add.staticImage(larguraJogo / 2, alturaJogo / 2, 'plataforma_tijolo')
  plataforma2 = this.physics.add.staticImage(160, 630, 'plataforma_tijolo2')
  plataforma3 = this.physics.add.staticImage(550, 680, 'plataforma_tijolo3')
  // add colisões entre as plataformas e o alien
  this.physics.add.collider(alien, plataforma1)
  this.physics.add.collider(alien, plataforma2)
  this.physics.add.collider(alien, plataforma3)

  
  moeda = this.physics.add.sprite(larguraJogo / 2, 0, 'moeda') //atribua a 'moeda' a sprite do moeda e seta sua origem
  moeda.setCollideWorldBounds(true) // add colisões da moeda com a tela
  moeda.setBounce(0.3) // define o bounce da moeda
  // add colisões entre a moeda e as plataformas
  this.physics.add.collider(moeda, plataforma1)
  this.physics.add.collider(moeda, plataforma2)
  this.physics.add.collider(moeda, plataforma3)

  placar = this.add.text(50, 50, 'Moedas' + pontuacao, { fontSize: '45px', fill: '#495613' }) // add o placar 
  // configura a captura da moeda, e soma os pontos
  this.physics.add.overlap(alien, moeda, function () { // é um detector de colisões, entre o alien e a moeda
    moeda.setVisible(false)
    var posicaoMoeda_Y = Phaser.Math.RND.between(50, 650) // gera uma posição nova aleatória para a moeda
    moeda.setPosition(posicaoMoeda_Y, 100) //  configura a nova posição da moeda
    pontuacao += 1 // acresenta mais um ponto no placar
    placar.setText('Moedas: ' + pontuacao) 
    moeda.setVisible(true)
  })

  alien.body.setSize(100, 80, true) // altera o hitbox do alien
}

function update() {
  // define as ações de cada tecla
  if (teclado.left.isDown) {
    alien.setVelocityX(-150);
  }
  else if (teclado.right.isDown) {
    alien.setVelocityX(150);
  }
  else {
    alien.setVelocityX(0)
  }
  if (teclado.up.isDown) {
    alien.setVelocityY(-150)
    ativarTurbo() // chama a função de liberar a imagem do turbo
  }
  else {
    semTurbo() // chama a função de desativar a imagem do turbo
  }

  fogo.setPosition(alien.x, alien.y + alien.height / 2) // configura o fogo para seguir o alien

}

function ativarTurbo() {
  fogo.setVisible(true) // deixa visivel o turbo
}

function semTurbo() {
  fogo.setVisible(false) // deixa invisivel o turbo
}