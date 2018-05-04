import PropTypes from "prop-types";
import React from "react";
import { ProgressBar, Badge, Alert, Fade, ListGroup, ListGroupItem } from "react-bootstrap";

const PlayerStats = props => (
  <div>
    <h3>
      <span> 📊</span> Player statistics:
    </h3>
    <ListGroup>
      <ListGroupItem key="health">
        <span>🧡</span> Health
        <ProgressBar now={props.health} label={props.health + "/100"} bsStyle="danger" />
      </ListGroupItem>
      <ListGroupItem key="fatigue">
        <span>😫</span> Fatigue
        <ProgressBar now={props.fatigue} label={props.fatigue + "/100"} bsStyle="success" />
      </ListGroupItem>
      <ListGroupItem key="cash">
        <span>💰</span> Cash <Badge bsStyle="primary">{props.cash}</Badge>
      </ListGroupItem>
      <ListGroupItem key="skills">
        ️ <span>⚔️</span> Fighting skill <Badge bsStyle="primary">{props.skills.fight}</Badge>
      </ListGroupItem>
    </ListGroup>
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

export default PlayerStats;
