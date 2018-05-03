class Player {
  constructor(game) {
    this.game = game;
    this.health = 100;
    this.cash = 10;
    this.status = "";
  }
  fight = () => {
    this.game.addLog("Fight is over!" + Math.random());
    this.cash = this.cash + 2;
    this.health = this.health - Math.round(Math.random() * 10 + 1);
    if (this.health <= 0) {
      this.health = 0;
      this.status = "You're dead";
    }
    return this.game;
  };
  canFight = () => {
    return this.health > 0;
  };
}

class Game {
  constructor() {
    this.player = new Player(this);
    this.log = [];
  }
  addLog = text => {
    this.log.push(text);
    if (this.log.length > 10) {
      this.log.shift();
    }
  };
}

export default Game;
