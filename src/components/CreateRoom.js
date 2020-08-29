import React, { Component } from "react";
import socket, { generateGameCode } from "../scenes/SocketHub.js";
export let newKey;

class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: null,
      username: "",
      playerCount: 0,
    };
    this.generateGameCode = this.generateGameCode.bind(this);
    // this.listen = this.listen.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  createGame() {
    let key = generateGameCode();
    this.setState({ key: key });
    console.log(`Creating game at: room/${key}`);
    socket.emit("createRoom", key, username);
    newKey = key;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createGame}>
          <label htmlFor="name">
            Name:
            <input type="text" name="name" placeholder="Enter Player Name" />
            <button onClick={this.createGame}>Create Game Room</button>
          </label>
        </form>
      </div>
    );
  }
}

export default CreateRoom;
