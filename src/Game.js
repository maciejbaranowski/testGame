class Player {
  constructor() {
    this.health = 100;
    this.cash = 10;
    this.status = "";
  }
}

class Game {
  constructor() {
    this.player = new Player();
  }
  fight = () => {
    this.player.cash = this.player.cash + 2;
    this.player.health = this.player.health - Math.round(Math.random() * 10 + 1);
    if (this.player.health <= 0) {
      this.player.status = "You're dead";
    }
    return this;
  };
}

export default Game;