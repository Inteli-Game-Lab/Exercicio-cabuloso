window.onload =  function(){

    const config = {
        type: Phaser.AUTO,
        width: 900,
        height: 600,
        physics: {
            default: "arcade",
            arcade: {
                gravity:{y:200},  //gravidade 0 no eixo y (player não cai)
                debug: false,
            }
        },
        scene: [Scene01, Scene02, Scene03]
    }
    let game  = new Phaser.Game(config);
   
};