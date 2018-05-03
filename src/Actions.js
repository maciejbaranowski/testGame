import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";

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
  const definitions = [
    {
      callback: () => {
        props.game.player.fight(props.game.getNewMonster("lama"));
      },
      text: "Fight Lama",
      isDisabled: !props.game.player.canFight()
    },
    {
      callback: () => {
        props.game.player.fight(props.game.getNewMonster("bear"));
      },
      text: "Fight Bear",
      isDisabled: !props.game.player.canFight()
    },
    {
      callback: () => {
        props.game.player.fight(props.game.getNewMonster("dragon"));
      },
      text: "Fight Dragon",
      isDisabled: !props.game.player.canFight()
    },
    {
      callback: () => {
        props.game.player.eat();
      },
      text: "Eat (5 cash)",
      isDisabled: !props.game.player.canEat()
    },
    {
      callback: () => {
        props.game.player.sleep();
      },
      text: "Sleep (1 cash)",
      isDisabled: !props.game.player.canSleep()
    },
    {
      callback: () => {
        props.game.player.resurect();
      },
      text: "Resurect",
      isDisabled: !props.game.player.canResurect()
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
