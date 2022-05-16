var config = {
  type: Phaser.AUTO,
  width: 640,
  height: 575,
  physics: {
    default: 'arcade'
  },
  parent: 'phaser-example',
  pixelArt: true,
  backgroundColor: '#FFFFFF',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

var game = new Phaser.Game(config);
var dir = 'leste';
var inZone = false;
var restart = false
var gameOver = false;

var myInterval;
var layer;
var map;
var player;
var star;
var tileset;

function preload() {
  const { stage } = Qs.parse(location.search, { ignoreQueryPrefix: true })
  this.load.image('tiles', 'assets/drawtiles-spaced.png');
  this.load.image('player', 'assets/car90.png');
  this.load.image('star', 'assets/star.png');
  this.load.tilemapCSV('map', 'assets/fase_' + stage + '.csv');
}

function create() {
  const { posx, posy } = Qs.parse(location.search, { ignoreQueryPrefix: true })
  map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 })
  tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2)
  layer = map.createDynamicLayer(0, tileset, 0, 0)

  star = this.physics.add.image(parseInt(posx), parseInt(posy), 'star')
  player = this.physics.add.image(176, 240, 'player')

  this.physics.add.collider(player, layer)
  this.physics.add.collider(player, star)
  this.physics.add.overlap(player, star, collectStar, null, this);
  this.physics.add.overlap(player, star, function () {
    inZone = true
  });
}

function update () {
  if (restart === true) {
    restart = false
    const { posx, posy } = Qs.parse(location.search, { ignoreQueryPrefix: true })
    star.enableBody(true, parseInt(posx), parseInt(posy), true, true)
  }
}

function resetPosition(repeat) {
  player.x = 176;
  player.y = 240;
  player.angle = 0;
  dir = 'leste';
  gameOver = false;
  restart = true;
  if (repeat === true) {
    showCodePopUp()
  }
}

function onTheZone() {
  return inZone;
}

function moverParaFrente() {
  switch (dir) {
    case 'leste':
      var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

      if (tile.index === 1) {
        console.log('l')
      } else {
        player.angle = 0;
        player.x += 32;
      }
      break;
    case 'oeste':
      var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

      if (tile.index === 1) {
        console.log('o')
      } else {
        player.angle = 180;
        player.x -= 32;
      }
      break;
    case 'sul':
      var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

      if (tile.index === 1) {
        console.log('s')
      } else {
        player.y += 32;
      }
      break;
    case 'norte':
      var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

      if (tile.index === 1) {
        console.log('n')
      } else {
        player.y -= 32;
      }
      break;
  }
}

function virarEsquerda() {
  switch (dir) {
    case 'leste':
      player.angle = -90;
      dir = 'norte';
      break;
    case 'oeste':
      player.angle = 90;
      dir = 'sul';
      break;
    case 'sul':
      player.angle = 0;
      dir = 'leste';
      break;
    case 'norte':
      player.angle = 180;
      dir = 'oeste';
      break;
  }
}

function virarDireita() {
  switch (dir) {
    case 'leste':
      player.angle = 90;
      dir = 'sul';
      break;
    case 'oeste':
      player.angle = -90;
      dir = 'norte';
      break;
    case 'sul':
      player.angle = 180;
      dir = 'oeste';
      break;
    case 'norte':
      player.angle = 0;
      dir = 'leste';
      break;
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
  showCodePopUp(true)
}