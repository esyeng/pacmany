import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";

class GamePage extends Component {
  componentDidMount() {
    const game = new Phaser.Game(config);
  }
  render() {
    return <div style={{ color: "white" }}></div>;
  }
}

export default GamePage;
