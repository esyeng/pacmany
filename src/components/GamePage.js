import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";

class GamePage extends Component {
  componentDidMount() {
    const game = new Phaser.Game(config); // how is game rendered? looks like it isn't loading here
  }
  render() {
    return <div style={{ color: "white" }}></div>;
  }
}

export default GamePage;
