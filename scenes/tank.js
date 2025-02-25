class tank extends Phaser.Scene {
    constructor() {
        super({ key: "tank" });
    }

    preload() {
        // assets
        this.load.image('hull', 'assets/Hull_01.png');
        this.load.image('gun', 'assets/Gun_01.png');
        this.load.image('bg', 'assets/bg.jpg');
    }

    create() {
        this.bg = this.add.image(500, 400, 'bg').setScale(3);

        this.hull = this.add.image(400, 300, 'hull').setScale(0.5);

        this.gun = this.add.image(400, 320, 'gun').setScale(0.5);

        this.teclado = this.input.keyboard.createCursorKeys();

        this.teclasWASD = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        // Movimentação com WASD ou setas
        if (this.teclado.left.isDown || this.teclasWASD.left.isDown) {
            this.hull.x -= 1;
            this.gun.x -= 1;
            this.hull.setRotation(3 * Math.PI/2);
        }
        if (this.teclado.right.isDown || this.teclasWASD.right.isDown) {
            this.hull.x += 1;
            this.gun.x += 1;
            this.hull.setRotation(Math.PI/2);
        }
        if (this.teclado.up.isDown || this.teclasWASD.up.isDown) {
            this.hull.y -= 1;
            this.gun.y -= 1;
            this.hull.setRotation(0);
        }
        if (this.teclado.down.isDown || this.teclasWASD.down.isDown) {
            this.hull.y += 1;
            this.gun.y += 1;
            this.hull.setRotation(Math.PI);
        }
    
        // A rotação da arma baseada no movimento do mouse/cursor
        
        this.gun.rotation = Phaser.Math.Angle.Between(
            this.hull.x, this.hull.y, 
            this.input.activePointer.worldX, this.input.activePointer.worldY
        );
    }    
}
