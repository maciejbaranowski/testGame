import PropTypes from "prop-types";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Log = props => (
  <div>
    <h3> <span>📜 </span> Game log:</h3>
    <ListGroup className="gradientOverlay">
      {props.log.map((logText, i) => {
        return <ListGroupItem key={i} active={i === 0}>{logText}</ListGroupItem>;
      })}
    </ListGroup>
  </div>
);
Log.propTypes = {
  log: PropTypes.array.isRequired
};

export default Log;
