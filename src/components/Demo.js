import React, { Component } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import { Navbar } from "./Navbar";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import io from "socket.io-client";
const socket = io("http://localhost:8080/");
// let userName = prompt("Your Name, please");
// let roomName = prompt("room name");
// let chat = prompt("your message to other players, please");
let ID = "";
let players = [];
let playerCount = 0;

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: userName,
      room: "demo",
      ready: false,
      gameStarted: false,
      gameInProgress: false,
      gameEnded: false,
      name: this.props.name,
      players: [],
      playerCount: 0,
    };
    this.getGameStarted = this.getGameStarted.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    let data = {
      ID,
      userName,
      roomName,
    };
    console.log(userName);
    socket.emit("join room", data);
    socket.on("send data", (data) => {
      players.push(data);
      playerCount++;
    });
    const game = new Phaser.Game(config);
    console.log(players);
    socket.on("show players", function (users) {
      players = [...users];
    });
    this.setState({ players: players });
  }

  startGame() {
    // let room = this.state.roomKey;
    this.setState({
      gameStarted: true,
      gameInProgress: true,
    });
    socket.emit("startGame");
    // const game = new Phaser.Game(config);
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
          <div
            id="phaser-container"
            style={{
              width: "1024px",
              height: "768px",
              textAlign: "center",
              justifyContent: "center",
            }}
          ></div>
          <div id="demo-sidebar">
            <div id="allin">
              <button onClick={this.startGame} name="all in" type="button">
                {" "}
                All In?
              </button>
            </div>
            <div
              style={{
                backgroundColor: "light-gray",
                height: "400px",
                width: "200px",
              }}
            >
              <div id="playerbox">
                <p style={{ color: "yellow", fontSize: "14pt" }}>
                  enter player : {`${userName}`}
                </p>
                ; ) )
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Demo);

//: (
{
  /* <p style={{ color: "yellow", fontSize: "18pt" }}>
  no players here
                  </p>
                ) */
}
