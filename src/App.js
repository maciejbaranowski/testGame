import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import Game from "./Game";
import PlayerStats from "./PlayerStats"
import Actions from "./Actions"
import Log from "./Log"

class App extends Component {
  constructor() {
    super();
    this.state = {
      game: new Game()
    };
  }
  render() {
    return (
      <Grid className="App">
        <Row>
          <Col md={4}>
            <PlayerStats
              health={this.state.game.player.health}
              cash={this.state.game.player.cash}
              status={this.state.game.player.status}
            />
          </Col>
          <Col md={4}>
            <Actions
              game={this.state.game}
              updateGame={newState => {
                this.setState({ game: newState });
              }}
            />
          </Col>
          <Col md={4}>
            <Log log={this.state.game.log} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
