var Game = {};

Game.init = function() {
	game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
	game.load.tilemap(
		"map",
		"assets/maps/refuge_town.json",
		null,
		Phaser.Tilemap.TILED_JSON
	);
	game.load.spritesheet(
		"tileset",
		"assets/maps/refuge_town_tileset.png",
		16,
		16
	);
	game.load.image("sprite", "assets/sprites/boy.png"); // player sprite
};

Game.create = function() {
	//game.world.scale.set(2, 2);
	Game.playerMap = {};
	var map = game.add.tilemap("map");
	map.addTilesetImage("pm_classic_bank", "tileset"); // tilesheet is the key of the tileset in map's JSON file
	var layer;
	for (var i = 0; i < map.layers.length; i++) {
		layer = map.createLayer(i);
	}
	layer.inputEnabled = true; // Allows clicking on the map
	layer.events.onInputUp.add(Game.getCoordinates, this);
	Client.askNewPlayer();
};

Game.addNewPlayer = function(id, x, y) {
	Game.playerMap[id] = game.add.sprite(x, y, "sprite");
};

Game.removePlayer = function(id) {
	Game.playerMap[id].destroy();
	delete Game.playerMap[id];
};

Game.getCoordinates = function(layer, pointer) {
	Client.sendClick(pointer.worldX, pointer.worldY);
};

Game.movePlayer = function(id, x, y) {
	var player = Game.playerMap[id];
	var distance = Phaser.Math.distance(player.x, player.y, x, y);
	var duration = distance * 10;
	var tween = game.add.tween(player);
	tween.to({ x: x, y: y }, duration);
	tween.start();
};
