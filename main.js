window.onload =  function(){

    const config = {
        type: Phaser.AUTO,
        width: 900,
        height: 700,
        physics: {
            default: "arcade",
            arcade: {
                debug: true,
            }
        },
        scene: [tank]
    }
    let game  = new Phaser.Game(config);
   
};