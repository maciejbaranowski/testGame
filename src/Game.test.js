import Game from "./Game";

describe("Player operations", () => {
  let game;
  beforeEach(() => {
    game = new Game(() => {});
  });

  it("creates default player", () => {
    expect(game.player.cash).toEqual(10);
    expect(game.player.health).toEqual(100);
  });

  it("conducts simple fight", () => {
    game.player.fight(game.getNewMonster("lama"));
    expect(game.player.cash).toEqual(14);
    expect(game.player.health).toBeLessThan(100);
    expect(game.log.pop()).toContain("Fight");
  });

  it("conducts fight with unknown monster", () => {
    game.player.fight(game.getNewMonster("blahblah"));
    expect(game.player.health).toBeLessThan(100);
    expect(game.log.pop()).toContain("Unknown creature");
  });

  it("changes state to dead", () => {
    game.player.health = 1;
    game.player.fight(game.getNewMonster("lama"));
    expect(game.player.status).toContain("dead");
    expect(game.player.canFight()).toBeFalsy();
  });

  it("restores defaults after resurect", () => {
    game.player.health = 1;
    game.player.fight(game.getNewMonster("dragon"));
    expect(game.player.canResurect()).toBeTruthy();
    game.player.resurect();
    expect(game.player.health).toEqual(100);
    expect(game.player.cash).toEqual(10);
  })

  it("restores health when eating", () => {
    game.player.health = 1;
    expect(game.player.canEat()).toBeTruthy();
    game.player.eat();
    expect(game.player.health).toEqual(100);
  })
  it("restores fatigue when sleeping", () => {
    game.player.fatigue = 1;
    expect(game.player.canSleep()).toBeTruthy();
    game.player.sleep();
    expect(game.player.fatigue).toEqual(100);
  })
});
