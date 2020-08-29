import React, { Component } from "react";
import socket from "../scenes/SocketHub.js";
import "phaser";
import config from "../config/config";
// let key = generateGameCode();

class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      playerCount: 0,
    };
    this.generateGameCode = this.generateGameCode.bind(this);
    // this.listen = this.listen.bind(this);
    this.createGame = this.createGame.bind(this);
  }
  generateGameCode() {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createGame(e) {
    e.preventDefault();
    let key = this.generateGameCode();
    this.setState({ key: key });
    console.log(`Creating game at: room/${this.state.key}`);
    socket.emit("createRoom", this.state.key);
    // newKey = this.state.key;
    const game = new Phaser.Game(config);
    window.location.assign(`http://localhost:8080/room/${this.state.key}`);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createGame}>
          <button onClick={this.createGame}>Create Game Room</button>
        </form>
      </div>
    );
  }
}

export default CreateRoom;
