import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import { LeftSideBar } from "./LeftSideBar";
import { RightSideBar } from "./RightSideBar";
import { Navbar } from "./Navbar";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

var Client = require("../client");

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      gameStarted: false,
      gameEnded: false,
      roomKey: this.props.match.params.roomCode,
      name: this.props.match.params.userName,
      players: [],
      numberOfPlayers: 0,
      isHost: false,
      notEnoughPlayers: false,
      singlePlayer: false,
    };
    this.startGame = this.startGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.handleRoomAtCapacity = this.handleRoomAtCapacity.bind(this);
    this.handleNotEnoughPlayers = this.handleNotEnoughPlayers.bind(this);
    this.handleGameStarted = this.handleGameStarted.bind(this);
    this.handleInvalidRoom = this.handleInvalidRoom.bind(this);
  }

  componentDidMount() {
    const game = new Phaser.Game(config);
    Client.Client.socket.emit("joinRoom", {
      userName: this.state.name,
      roomCode: this.state.roomKey,
    });

    this.setState({
      ready: true,
    });

    if (this.props.match.url.split("/")[1] === "host") {
      this.setState({
        isHost: true,
      });
    }

    if (this.props.match.url.split("/")[1] === "singlePlayer") {
      this.setState({
        isHost: true,
        singlePlayer: true,
      });
    }

    setInterval(this.updateGame, 900);
  }

  componentDidUpdate() {
    Client.Client.socket.on("roomAtCapacity", this.handleRoomAtCapacity);
    Client.Client.socket.on("invalidRoom", this.handleInvalidRoom);
    Client.Client.socket.on("notEnoughPlayers", this.handleNotEnoughPlayers);
  }

  handleGameStarted() {
    this.setState({
      gameStarted: true,
      notEnoughPlayers: false,
    });
  }

  handleNotEnoughPlayers() {
    this.setState({
      notEnoughPlayers: true,
    });
  }

  handleRoomAtCapacity() {
    window.location = "/roomAtCapacity";
  }

  handleInvalidRoom() {
    window.location = "/invalidRoom";
  }

  updateGame() {
    let mS = window.MainScene;
    let tempArr = [];
    if (mS) {
      for (let i = 0; i < 4; i++) {
        if (mS[`player${i}`]) {
          tempArr.push(mS[`player${i}`]);
        }
      }
      this.setState({
        players: tempArr,
      });
    }
  }

  startGame() {
    let room = this.state.roomKey;
    if (this.props.match.url.split("/")[1] === "singlePlayer") {
      window.MainScene.startGame();
      Client.Client.socket.emit("startGame", {
        room: room,
        singlePlayer: true,
      });
      this.setState({
        gameStarted: true,
      });
    } else {
      Client.Client.socket.emit("startGame", { room: room });
      if (window.MainScene.player3) {
        window.MainScene.startGame();
        this.setState({
          gameStarted: true,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <LeftSideBar
              players={this.state.players}
              roomCode={this.state.roomKey}
            />
          </div>
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
              notEnoughPlayers={this.state.notEnoughPlayers}
              isHost={this.state.isHost}
              isSinglePlayer={this.state.singlePlayer}
              roomCode={this.state.roomKey}
              players={this.state.players}
              goBack={this.props.history.goBack}
              startGame={this.startGame}
              gameStarted={this.state.gameStarted}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GamePage);
