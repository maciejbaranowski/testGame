import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";

const Action = props => (
  <div hidden={props.isHidden}>
    <Button onClick={props.callback} disabled={props.isDisabled} bsStyle={props.style}>
      {props.text}
    </Button>
  </div>
);

Action.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
  isHidden : PropTypes.bool,
  isDisabled : PropTypes.bool
};
Action.defaultProps = {
  isHidden: false,
  isDisabled: false,
  style: "default"
}

const Actions = props => {
  const definitions = [
    {
      callback: () => {
        props.game.player.fight(props.game.getNewMonster("lama"));
      },
      text: "Fight Lama",
      isDisabled: !props.game.player.canFight(),
      style: "warning"
    },
    {
      callback: () => {
        props.game.player.fight(props.game.getNewMonster("bear"));
      },
      text: "Fight Bear",
      isDisabled: !props.game.player.canFight(),
      style: "warning"
    },
    {
      callback: () => {
        props.game.player.fight(props.game.getNewMonster("dragon"));
      },
      text: "Fight Dragon",
      isDisabled: !props.game.player.canFight(),
      style: "warning"
    },
    {
      callback: () => {
        props.game.player.eat();
      },
      text: "Eat (5 cash)",
      isDisabled: !props.game.player.canEat(),
      style: "success"
    },
    {
      callback: () => {
        props.game.player.sleep();
      },
      text: "Sleep (1 cash)",
      isDisabled: !props.game.player.canSleep(),
      style: "success"
    },
    {
      callback: () => {
        props.game.player.train();
      },
      text: "Train fighting (10 cash)",
      isDisabled: !props.game.player.canTrain(),
      style: "success"
    },
    {
      callback: () => {
        props.game.player.resurect();
      },
      text: "Resurect",
      isHidden: !props.game.player.canResurect(),
      style: "danger"
    }
  ];
  return (
    <div>
      <h3>Actions:</h3>
      {definitions.map((def, i) => {
        return <Action key={i} {...def} />;
      })}
    </div>
  );
};

Actions.propTypes = {
  game: PropTypes.object.isRequired,
};

export default Actions;
