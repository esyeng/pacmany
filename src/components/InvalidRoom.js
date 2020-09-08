import React, { Component } from "react";
import { Link } from "react-router-dom";

class InvalidRoom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ color: "red" }}>
        <h1>The room code you entered is invalid.</h1>
        <h3>Please try joining or starting a new game.</h3>
        <Link to="/">
          <button id="returnHomeButton">Return home</button>
        </Link>
      </div>
    );
  }
}

export default InvalidRoom;
