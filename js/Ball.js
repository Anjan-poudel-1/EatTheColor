class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        let placement = [1.2, 2, 4, 7];
        let _rand = Math.floor(Math.random() * 4);
        let _x = placement[_rand];
        let isGreenBall = Math.random() < 0.8;

        var y = -20;
        super(
            scene,
            // config.width / ballData.xCoordinate,
            config.width / _x,
            y,
            isGreenBall ? "greenball" : "redball"
        );
        this.setScale(0.7);
        scene.add.existing(this);

        scene.physics.world.enableBody(this);
        this.body.velocity.y = 300;
        scene.ballsToEat.add(this);
    }

    destroyBalls = () => {
        if (this.y > config.height - 30) {
            this.destroy();
        }
    };
}
