class Monster {
  constructor(def) {
    this.name = def.name;
    this.power = def.power;
    this.cash = def.cash;
  }
  getHitpoints = () => {
    return Math.round(Math.random() * this.power + 1);
  };
}

class Player {
  constructor(game) {
    this.game = game;
    this.health = 100;
    this.cash = 10;
    this.status = "";
  }
  fight = monster => {
    const hitpoints = monster.getHitpoints();
    this.cash = this.cash + monster.cash;
    this.health = this.health - hitpoints;
    if (this.health <= 0) {
      this.health = 0;
      this.status = "You're dead";
    }

    this.game.addLog(`Fight with ${monster.name} is over.
                      You lost ${hitpoints} health during the battle.
                      You gained ${
                        monster.cash
                      } gold pieces from the monster.`);
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
    this.monsterDifinitions = new Map();
    this.monsterDifinitions.set("lama", {
      name: "Lama",
      power: 10,
      cash: 4
    });
    this.monsterDifinitions.set("bear", {
      name: "Bear",
      power: 40,
      cash: 10
    });
    this.monsterDifinitions.set("dragon", {
      name: "Dragon",
      power: 300,
      cash: 100
    });
  }
  addLog = text => {
    this.log.push(text);
    if (this.log.length > 10) {
      this.log.shift();
    }
  };
  getNewMonster = name => {
    let definition = this.monsterDifinitions.get(name);
    if (definition) {
      return new Monster(definition);
    }
    return new Monster({ name: "Unknown creature", power: 100000, cash: 0 });
  };
}

export default Game;
