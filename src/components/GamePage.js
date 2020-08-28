import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import { LeftSideBar } from "./LeftSideBar";
import { RightSideBar } from "./RightSideBar";
import { Navbar } from "./Navbar";
import socket from "../scenes/SocketHub";
import { Button, withStyles } from "@material-ui/core";

const classes = useStyles(props);
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.listenForJoin = this.listenForJoin.bind(this);
    this.state = {
      ready: false,
      gameStarted: false,
      gameInProgress: false,
      gameEnded: false,
      roomKey: this.props.gameCode,
      name: this.props.name,
      players: {},
      playerCount: 0,
    };
  }

  createGame(roomKey = this.state.roomKey, players = this.state.players) {
    let name = this.state.name;
    this.setState({ playerCount: playerCount++ });
    socket.emit("createRoom", roomKey, name);
    socket.on("newPlayers", function (players) {
      socket.to(roomKey).emit({ players: players });
      this.setState({ players: players });
    });
  }

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <LeftSideBar players={players} roomCode={this.state.roomKey} />
          </div>
          {this.gameStarted ? (
            <div
              id="phaser-container"
              style={{
                width: "1024px",
                height: "768px",
                textAlign: "center",
                justifyContent: "center",
              }}
            ></div>
          ) : (
            <div>
              <h3>{`Waiting for game to start. Players: ${this.state.playerCount}`}</h3>

              <Button
                style={{ backgroundColor: "black" }}
                className={classnames(classes.button, classes.startPlaying)}
                onClick={this.startGame()}
              >
                All in!
              </Button>
            </div>
          )}

          <div>
            <RightSideBar
              players={players}
              goBack={this.props.history.goBack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Canvas);
