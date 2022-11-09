class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, xCoordinate, isGreenBall) {
        // let placement = [-100, -250, -400];

        var y = -20;
        super(
            scene,
            // config.width / ballData.xCoordinate,
            config.width / 2 + xCoordinate,
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
