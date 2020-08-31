import React, { Component, useState, useEffect } from "react";
import Phaser from "phaser";
import { config } from "../config/config";

import io from "socket.io-client";
const socket = io("http://localhost:8080");

import { LeftSideBar } from "./LeftSideBar";
import { RightSideBar } from "./RightSideBar";
import { Navbar } from "./Navbar";

const players = [
  {
    id: 1,
    userName: "missPac",
    score: "1000",
    health: "100",
  },
  {
    id: 2,
    userName: "pac-wizard20",
    score: "900",
    health: "90",
  },
  {
    id: 3,
    userName: "pacPro2000",
    score: "500",
    health: "50",
  },
  {
    id: 4,
    userName: "jenG",
    score: "859",
    health: "65",
  },
];


class GamePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

    const game = new Phaser.Game(config);
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

export default GamePage;
