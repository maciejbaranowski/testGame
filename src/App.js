import React, { Component } from "react";
import PropTypes from "prop-types";
import Game from "./Game";
import {
  Button,
  ProgressBar,
  Grid,
  Row,
  Col,
  Badge,
  Alert,
  Fade,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";

const PlayerStats = props => (
  <div>
    <h3>Player statistics:</h3>
    <ul>
      <li key="health">
        Health:{" "}
        <ProgressBar
          now={props.health}
          label={props.health + "/100"}
          bsStyle="danger"
        />
      </li>
      <li key="cash">
        Cash: <Badge>{props.cash}</Badge>
      </li>
    </ul>
    <Fade in={props.status.length > 0}>
      <Alert bsStyle="danger">{props.status}</Alert>
    </Fade>
  </div>
);
PlayerStats.propTypes = {
  health: PropTypes.number.isRequired,
  cash: PropTypes.number.isRequired,
  status: PropTypes.string
};

const Action = props => (
  <div>
    <Button onClick={props.callback} disabled={props.isDisabled}>
      {props.text}
    </Button>
  </div>
);

Action.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const Actions = props => {
  return (
    <div>
      <h3>Actions:</h3>
      <Action
        callback={() => {
          props.updateGame(props.game.player.fight());
        }}
        text={"Fight!"}
        isDisabled={!props.game.player.canFight()}
      />
    </div>
  );
};

Actions.propTypes = {
  game: PropTypes.object.isRequired,
  updateGame: PropTypes.func.isRequired
};

const Log = props => (
  <div>
    <h3>Game log:</h3>
    <ListGroup>
      {props.log.map(logText => {
        return <ListGroupItem>{logText}</ListGroupItem>;
      })}
    </ListGroup>
  </div>
);

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
