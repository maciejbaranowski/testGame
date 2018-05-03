import PropTypes from "prop-types";
import React from "react";
import {
  ProgressBar,
  Badge,
  Alert,
  Fade,
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

export default PlayerStats;