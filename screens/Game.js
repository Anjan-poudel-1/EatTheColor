class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    init() {
        this.physics.pause();
    }
    preload() {}

    create() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, "bg");
        this.bg.setOrigin(0, 0);

        this.theme_audio = this.sound.add("theme_audio", {
            volume: 0.5,
            loop: true,
        });

        this.eat_audio = this.sound.add("eat_audio");
        this.hurt_audio = this.sound.add("hurt_audio");

        this.theme_audio.play();

        this.time = 0;
        this.isGameActive = false;

        this.player = this.physics.add
            .sprite(config.width / 2, config.height - 30, "player_img")
            .setScale(0.7);

        this.player.setCollideWorldBounds(true);

        //Player controls
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.SpaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        //keyoard press
        let styleKeyboard = {
            font: "32px Arial",
            fill: "#fff",
            textAlign: "center",
        };
        this.KeyboardText = this.add.text(
            config.height / 2 + 20,
            config.width / 2 - 100,
            "Press Space to continue",
            styleKeyboard
        );

        this.SpaceKey.on("up", () => {
            this.isGameActive = true;
            this.KeyboardText.setText("");
        });

        let _data = false;

        //Balls

        this.ballsToEat = this.add.group();

        //Physics... collision... score
        this.physics.add.overlap(
            this.player,
            this.ballsToEat,
            this.eatBalls,
            null,
            this
        );

        this.player.setInteractive();
        this.input.setDraggable(this.player);

        this.input.dragDistanceThreshold = 16;
        this.input.on("drag", function (pointer, player, dragX, dragY) {
            // if (dragX > config.width / 2) {
            //     return;
            // }
            player.x = dragX;
        });

        //Score
        this.score = 0;
        let style = { font: "20px Arial", fill: "#fff" };
        this.scoreText = this.add.text(16, 16, "score: 0", style);
    }

    update() {
        const d = new Date();
        let ms = d.getMilliseconds();
        // console.log(ms);

        if (this.isGameActive) {
            this.physics.resume();
            if (
                ms - this.time > 120 ||
                (this.time > ms && 1000 - this.time + ms > 120)
            ) {
                var ball = new Ball(this);
                // console.log("---------");
                // console.log("this.time", this.time);
                // console.log("ms", ms);
                this.time = ms;
            }
        }
        this.movePlayerManager();

        //destory those.. that are below the line.....
        for (var i = 0; i < this.ballsToEat.getChildren().length; i++) {
            var ballToDestroy = this.ballsToEat.getChildren()[i];
            ballToDestroy.destroyBalls();
        }
    }

    movePlayerManager() {
        this.player.setVelocity(0);
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-350);
        }

        if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(350);
        }
    }

    eatBalls(player, ball) {
        console.log("Hit");
        ball.destroy();

        if (ball.texture.key === "redball") {
            this.hurt_audio.play();
            this.score -= 25;
        } else {
            this.eat_audio.play();
            this.score += 10;
        }

        this.scoreText.setText("Score: " + this.score);

        // console.log(ball);
    }

    getRandomBall() {
        let placement = [1.25, 2, 3, 3.75];
        let _rand = Math.floor(Math.random() * 4);
        let _x = placement[_rand];
        // console.log(_rand);
        let isGreenBall = Math.random() < 0.7;

        return { xCoordinate: _x, isGreenBall };
    }
}
