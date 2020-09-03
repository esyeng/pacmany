import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import { LeftSideBar } from "./LeftSideBar";
import { RightSideBar } from "./RightSideBar";
import { Navbar } from "./Navbar";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";
import Client from "../client";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      gameStarted: false,
      gameInProgress: false,
      gameEnded: false,
      roomKey: this.props.match.params,
      name: this.props.name,
      players: [],
      playerCount: 0,
    };
    this.getGameStarted = this.getGameStarted.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    const game = new Phaser.Game(config);
  }

  startGame() {
    let room = this.state.roomKey;
    this.setState({
      gameStarted: true,
      gameInProgress: true,
    });
  }

  getGameStarted() {
    if (!this.gameStarted) {
      this.setState({ gameStarted: true });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <div>
            <LeftSideBar
              players={this.state.players}
              roomCode={this.state.roomKey}
            />
          </div> */}
          <div
            id="phaser-container"
            style={{
              width: "1024px",
              height: "768px",
              textAlign: "center",
              justifyContent: "center",
            }}
          ></div>
          <div>
            <RightSideBar
              players={this.state.players}
              goBack={this.props.history.goBack}
              startGame={this.startGame}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
