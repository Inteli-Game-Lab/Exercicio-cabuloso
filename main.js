window.onload =  function(){

    const config = {
        type: Phaser.AUTO,
        width: 1000,
        height: 800,
        physics: {
            default: "arcade",
            arcade: {
                gravity:{y:200},  //gravidade 0 no eixo y (player não cai)
                debug: false,
            }
        },
        scene: [tank]
    }
    let game  = new Phaser.Game(config);
   
};