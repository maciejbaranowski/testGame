import Game from "./Game";

describe("Player operations", () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });

  it("creates default player", () => {
    expect(game.player.cash).toEqual(10);
    expect(game.player.health).toEqual(100);
  });

  it("conducts simple fight", () => {
    game.fight();
    expect(game.player.cash).toEqual(12);
    expect(game.player.health).toBeLessThan(100);
  });

  it("changes state to dead", () => {
    game.player.health = 1;
    game.fight();
    expect(game.player.status).toContain("dead");
  });
});
