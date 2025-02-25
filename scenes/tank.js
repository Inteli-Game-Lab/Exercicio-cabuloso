class tank extends Phaser.Scene {
    constructor() {
        super({ key: "tank" });
    }

    preload() {
        // assets
        this.load.image('hull', 'assets/Hull_01.png');
        this.load.image('gun', 'assets/Gun_01.png');
        this.load.image('bg', 'assets/bg.jpg');
        this.load.image('barril', 'assets/cabum.png');
        this.load.image('explosao', 'assets/Explosion_A.png');
        this.load.image('bullet', 'assets/bala.jpg'); 
    }

    create() {
        this.bg = this.physics.add.image(500, 400, 'bg').setScale(3);

        this.hull = this.physics.add.image(200, 300, 'hull').setScale(0.5);

        this.gun = this.add.image(200, 320, 'gun').setScale(0.5);

        // Criar o barril em uma posição aleatória
        this.barril = this.physics.add.image(Phaser.Math.Between(300, 700), Phaser.Math.Between(400, 600), 'barril').setScale(0.2);

        // Grupo de balas
        this.balas = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        this.teclado = this.input.keyboard.createCursorKeys();

        this.teclasWASD = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Tecla de disparo
        this.teclaEspaco = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Variáveis para controle do delay de tiro
        this.ultimoTiro = 0;
        this.delayTiro = 1000; // 1 segundos de delay entre os tiros
    }

    update(time) {
        // Movimentação com WASD ou setas
        if (this.teclado.left.isDown || this.teclasWASD.left.isDown) {
            this.hull.x -= 1.2;
            this.gun.x -= 1.2;
            this.hull.setRotation(3 * Math.PI / 2);
        }
        if (this.teclado.right.isDown || this.teclasWASD.right.isDown) {
            this.hull.x += 1.2;
            this.gun.x += 1.2;
            this.hull.setRotation(Math.PI / 2);
        }
        if (this.teclado.up.isDown || this.teclasWASD.up.isDown) {
            this.hull.y -= 1.2;
            this.gun.y -= 1.2;
            this.hull.setRotation(0);
        }
        if (this.teclado.down.isDown || this.teclasWASD.down.isDown) {
            this.hull.y += 1.2;
            this.gun.y += 1.2;
            this.hull.setRotation(Math.PI);
        }

        // A rotação da arma baseada no movimento do mouse/cursor
        this.gun.rotation = Phaser.Math.Angle.Between(
            this.hull.x, this.hull.y,
            this.input.activePointer.worldX, this.input.activePointer.worldY
        );

        // Verificar se a tecla de disparo foi pressionada e se passou o tempo de delay
        if (Phaser.Input.Keyboard.JustDown(this.teclaEspaco) && time > this.ultimoTiro + this.delayTiro) {
            this.ultimoTiro = time; // Atualiza o tempo do último tiro
            this.atirar();
        }

        // Verificar overlap entre o barril e o tanque
        this.physics.overlap(this.hull, this.barril, this.explosao, null, this);

        // Verificar overlap entre as balas e o barril
        this.balas.children.each((bala) => {
            if (bala.active) {
                this.physics.overlap(bala, this.barril, this.explosao, null, this);
            }
        });
    }

    // Função para disparar uma bala
    atirar() {
        // Obter a bala do grupo
        let bala = this.balas.get(this.hull.x, this.hull.y);

        // Se houver uma bala disponível no grupo
        if (bala) {
            bala.setActive(true);
            bala.setVisible(true);
            bala.setScale(0.05)
            bala.setSize(50, 50)
            // Calcular a direção com base na rotação da arma
            let speed = 500; // Velocidade da bala
            this.physics.velocityFromRotation(this.gun.rotation, speed, bala.body.velocity);

            // Destruir a bala após 4 segundos
            this.time.delayedCall(4000, () => {
                bala.setActive(false);
                bala.setVisible(false);
            });
        }
    }

    // Função de explosão
    explosao(tanque, barril) {
        // Destruir o barril
        barril.destroy();

        // Criar uma explosão no lugar onde o barril estava
        let explosao = this.add.image(barril.x, barril.y, 'explosao').setScale(0.5);

        // Adicionar um tween para expandir a explosão
        this.tweens.add({
            targets: explosao,
            scaleX: 2,
            scaleY: 2,
            duration: 500,
            onComplete: () => {
                explosao.destroy();
            }
        });

        // Gerar um novo barril em um lugar aleatório (dentro de limites da tela)
        this.barril = this.physics.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 600), 'barril').setScale(0.2);
    }
}
