import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import { LeftSideBar } from "./LeftSideBar";
import { RightSideBar } from "./RightSideBar";
import { Navbar } from "./Navbar";
import socket from "../scenes/SocketHub";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.listen = this.listen.bind(this);
    this.state = {
      ready: false,
      gameStarted: false,
      gameInProgress: false,
      gameEnded: false,
      roomKey: this.props.roomKey,
      name: this.props.name,
      players: {},
    };
  }

  createGame(roomKey = this.state.roomKey, players = this.state.players) {
    let name = this.state.name;
    socket.emit("createRoom", roomKey, name);
    socket.on("newPlayers", function (players) {
      socket.to(roomKey).emit({ players: players });
      this.setState({ players: players });
    });
  }

  listenForJoin() {
    let newPlayers = { ...this.state.players };
    socket.on("playerJoin", function (player) {
      newPlayers[player] = player;
      this.setState({ players: newPlayers });
      socket.emit("newPlayers", this.state.players);
    });
  }

  joinGame() {
    let roomKey = this.state.roomKey;
    let name = this.state.name;
    socket.emit("joinRoom", roomKey, name);
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
  }

  render() {
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <LeftSideBar
              players={players}
              roomCode={this.props.match.params.roomCode}
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
              players={players}
              goBack={this.props.history.goBack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
