      // o que acontece aqui?
      const larguraJogo = 700;
      const alturaJogo = 850;

      // o que essa parte faz?
      const config = {
          type: Phaser.AUTO,
          width: larguraJogo,
          height: alturaJogo,

          scene: {
              preload: preload,
              create: create,
              update: update
          }
      };

      // o que acontece aqui?
      const game = new Phaser.Game(config);

      function preload() {
          this.load.image('background', 'assets/bg.png');
      }

      function create() {
          // o que acontece aqui?
          this.add.image(larguraJogo/2, alturaJogo/2, 'background');
      }

      function update() {
      }