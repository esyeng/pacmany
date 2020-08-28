import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import { LeftSideBar } from "./LeftSideBar";
import { RightSideBar } from "./RightSideBar";
import { Navbar } from "./Navbar";
import socket from "../scenes/SocketHub";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";

class Canvas extends Component {
  constructor(props) {
    super(props);
    // this.listenForJoin = this.listenForJoin.bind(this);
    this.state = {
      ready: false,
      gameStarted: false,
      gameInProgress: false,
      gameEnded: false,
      roomKey: this.props.roomKey,
      name: this.props.name,
      players: [],
      playerCount: 0,
    };
    this.generateGameCode = this.generateGameCode.bind(this);
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getGameStarted = this.getGameStarted.bind(this);
  }

  generateGameCode() {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({ roomKey: result });
  }
  // createGame(roomKey = this.state.roomKey, players = this.state.players) {
  //   let name = this.state.name;
  //   this.setState({ playerCount: playerCount++ });
  //   socket.emit("createRoom", roomKey, name);
  //   socket.on("newPlayers", function (players) {
  //     socket.to(roomKey).emit({ players: players });
  //     this.setState({ players: players });
  //   });
  // }

  // listenForJoin() {
  //   let newPlayers = { ...this.state.players };
  //   socket.on("playerJoin", function (player) {
  //     newPlayers[player] = player;
  //     this.setState({ players: newPlayers });
  //     this.setState({playerCount: playerCount++})
  //     socket.emit("newPlayers", this.state.players);
  //     console.log()
  //   });
  // }

  joinGame() {
    let roomKey = this.state.roomKey;
    let name = this.state.name;
    socket.emit("joinRoom", roomKey, name);
    this.setState({ playerCount: playerCount++ });
    socket.on("newPlayers", function (players) {
      socket.to(roomKey).emit({ players: players });
      this.setState({ players: players });
    });
    socket.roomId = roomKey;
  }

  startGame() {
    let room = this.state.roomKey;
    this.setState({
      gameStarted: true,
      gameInProgress: true,
    });
    socket.emit("startGame", room);
    const game = new Phaser.Game(config);
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
          <div>
            <LeftSideBar
              players={this.state.players}
              roomCode={this.state.roomKey}
            />
          </div>
          <div
            id={this.state.gameStarted ? "phaser-container" : "temp"}
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
              // startGame={this.startGame}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
