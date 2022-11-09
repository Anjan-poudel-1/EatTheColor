const config = {
    type: Phaser.Auto,
    height: 600,
    width: 1000,
    parent: "eat-that-color",
    title: "Eat the color",
    scene: [LoadingScreen, Game, FinalScore],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
};

var game = new Phaser.Game(config);
