class Monster {
  constructor(def) {
    Object.assign(this,def);
  }
  getHitpoints = () => {
    return Math.round(Math.random() * this.power + this.power);
  };
}

class Player {
  constructor(game) {
    this.game = game;
    this.health = 100;
    this.fatigue = 0;
    this.cash = 10;
    this.status = "";
    this.skills = {
      fight: 1
    }

    this.fatigueAutoRestore = setInterval(()=> {
      if (this.fatigue < 100)
      {
        this.fatigue = this.fatigue += 1;
        this.game.update();
      }
    }, 100);
  }
  isAlive = () => {
    return this.health > 0;
  }
  fight = monster => {
    const hitpoints = Math.max(monster.getHitpoints() - this.skills.fight, 0);
    this.health = this.health - hitpoints;
    this.fatigue = this.fatigue - 20;
    if(monster.special) {
      this.game.addLog("Small Pink Rabbit not only gives you some cash, but also heals you!");
      monster.special(this.game);
    };

    if (this.health <= 0) {
      this.health = 0;
      this.status = "You're dead";
      this.game.addLog(`You died while fighting with ${monster.name}`);
      this.game.update();
      return;
    }
    this.cash = this.cash + monster.cash;
    this.game.addLog(`Fight with ${monster.name} is over.
                      You lost ${hitpoints} health during the battle.
                      You gained ${
                        monster.cash
                      } gold pieces from the monster.`);
    this.game.update();
  };
  canFight = () => {
    return this.isAlive() && this.fatigue > 20;
  };
  eat = () => {
    this.cash -= 5;
    this.health = 100;
    this.game.addLog("You ate a nourishing meal, your health is restored.");
    this.game.update();
  }
  canEat = () => {
    return this.isAlive() && this.cash >= 5;
  }
  sleep = () => {
    this.cash -= 1;
    this.fatigue = 100;
    this.game.addLog("You restore your fatigue by sleepeing in an inn.");
    this.game.update();
  }
  canSleep = () => {
    return this.isAlive() && this.cash >= 1;
  }
  resurect = () => {
    delete this.game.player;
    this.game.player = new Player(this.game);
    this.game.addLog("You get back to a new, fresh life!");
    this.game.update();
  }
  canResurect = () => {
    return !this.isAlive()
  }
  train = () => {
    this.cash -= 10;
    this.fatigue -= 50;
    this.skills.fight +=1;
    this.game.addLog("Your fighting skills improved!");
    this.game.update();
  }
  canTrain = () => {
    return this.isAlive() && this.cash >= 10 && this.fatigue >= 50;
  }

  rabbitFightEnabled = () => {
    return this.health == 1; 
  }
}

const LOG_LENGTH = 5;
class Game {
  constructor(updateCallback) {
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
      power: 30,
      cash: 10
    });
    this.monsterDifinitions.set("dragon", {
      name: "Dragon",
      power: 100,
      cash: 100
    });
    this.monsterDifinitions.set("rabbit", {
      name: "Rabbit",
      power: 0,
      cash: 50,
      special: game => {
        game.player.health = 100;
      }
    });
    this.update = updateCallback;
  }
  addLog = text => {
    this.log.push(text);
    if (this.log.length > LOG_LENGTH) {
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
