import React, { Component } from "react";
import PropTypes from "prop-types";
import Game from "./Game"
import "./App.css";

const PlayerStats = props => (
  <div>
    <ul>
      <li key="health">Health: {props.health}</li>
      <li key="cash">cash: {props.cash}</li>
    </ul>
    {props.status}
  </div>
);
PlayerStats.propTypes = {
  health: PropTypes.number.isRequired,
  cash: PropTypes.number.isRequired,
  status: PropTypes.string
};

const Action = props => (
  <div>
    <button onClick={props.callback}>{props.text}</button>
  </div>
);

Action.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      game : new Game()
    };
  }
  fight = () => {
    this.setState(this.state.game.fight());    
  };
  render() {
    return (
      <div className="App">
        <PlayerStats
          health={this.state.game.player.health}
          cash={this.state.game.player.cash}
          status={this.state.game.player.status}
        />
        <Action callback={this.fight} text={"Fight!"} />
      </div>
    );
  }
}

export default App;
