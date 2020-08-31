import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import styles from "./styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classnames from "classnames";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Client from "../client";
// import startGame from "../startGame";
import game from "../config/config";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      showStartButton: true,
      openGameSettings: false,
      roomName: 0,
      openJoinGameSettings: false,
      players: [],
      playerCount: 0,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenGameSettings = this.handleOpenGameSettings.bind(this);
    this.handleCloseGameSettings = this.handleCloseGameSettings.bind(this);
    this.generateRoomName = this.generateRoomName.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.addNewPlayer = this.addNewPlayer.bind(this);
  }

  addNewPlayer() {
    console.log("in add new player");
    console.log("game in add new player: ", game);
    // game.state.add("Game", Game);
    // game.state.start("Game");

    // game.stage.disableVisibilityChange = true;
  }

  handleOpenModal() {
    this.setState({
      openModal: true,
      showStartButton: false,
    });
  }

  handleCloseModal() {
    this.setState({
      openModal: false,
      showStartButton: true,
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleOpenGameSettings(e) {
    console.log(e.target);
    this.setState({
      openModal: false,
      openGameSettings: true,
    });

    if (e.target.name === "joinGame") {
      this.setState({
        openJoinGameSettings: true,
      });
    } else {
      this.generateRoomName();
    }
  }

  handleCloseGameSettings() {
    this.setState({
      openModal: true,
      openGameSettings: false,
      openJoinGameSettings: false,
    });
  }

  generateRoomName() {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({
      roomName: result,
    });
  }

  joinGame() {
    console.log("in join game");
    let data = {
      id: 0,
      userName: this.state.userName,
      roomName: this.state.roomName,
    };
    console.log(this.state.userName);
    socket.emit("join room", data);
    socket.on("send data", (data) => {
      players.push(data);
      playerCount++;
    });
    console.log(players);
    socket.on("show players", function (users) {
      players = [...users];
    });
    this.setState({ players: players });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.gameHero}>
        <div className={classes.infoSection}>
          <header className={classes.movieHeader}>
            <h1>Welcome to Pac-Many</h1>
          </header>
        </div>
        <div
          className={classes.blurBackground}
          style={{
            backgroundImage: `url(https://www.hivplusmag.com/sites/default/files/2017/10/20/pac-man-x750.jpg)`,
          }}
        />
        <Link to="game">
          <Button
            style={{ backgroundColor: "black" }}
            className={classnames(classes.button, classes.startPlaying)}
            onClick={this.addNewPlayer}
          >
            TEST
            <ArrowRightAlt className={classes.buttonIcon} />
          </Button>
        </Link>
        <Link to="demo">
          <Button
            style={{ backgroundColor: "black" }}
            className={classnames(classes.button, classes.startPlaying)}
          >
            DEMO
            <ArrowRightAlt className={classes.buttonIcon} />
          </Button>
        </Link>
        <div className={classes.gameActions}>
          <Button
            className={classnames(classes.button, classes.startPlaying)}
            onClick={this.handleOpenModal}
            style={
              this.state.showStartButton ? { display: "" } : { display: "none" }
            }
          >
            Start playing
            <ArrowRightAlt className={classes.buttonIcon} />
          </Button>
        </div>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={this.state.openModal}
            onClose={this.handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.openModal}>
              <div className={classes.paper}>
                <Button
                  name="createGame"
                  onClick={this.handleOpenGameSettings}
                  className={classes.modalButtons}
                >
                  Start New Game
                </Button>
                <button
                  name="joinGame"
                  onClick={this.handleOpenGameSettings}
                  className={classes.modalButtons}
                >
                  Join Existing Game
                </button>
                <Link to={`/room/${this.state.roomName}`}>
                  <Button className={classes.modalButtons}>
                    Play on your own
                  </Button>
                </Link>
              </div>
            </Fade>
          </Modal>
        </div>

        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={this.state.openGameSettings}
            onClose={this.handleCloseGameSettings}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.openGameSettings}>
              <div className={classes.paper}>
                <form onSubmit={this.joinGame} className={classes.form}>
                  {this.state.openJoinGameSettings ? (
                    <div>
                      <label>
                        <strong>Code: </strong>
                      </label>
                      <input
                        className={classes.inputField}
                        type="text"
                        name="roomName"
                        onChange={this.handleInputChange}
                        placeholder="Enter Game Code"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className={classes.roomNameHeader}>
                        Your Game Code is{" "}
                      </span>
                      <strong>{this.state.roomName}</strong>
                    </div>
                  )}
                  <div>
                    <label>
                      <strong>Name: </strong>
                    </label>
                    <input
                      className={classes.inputField}
                      type="text"
                      name="userName"
                      onChange={this.handleInputChange}
                      placeholder="Enter Player Name"
                    />
                  </div>
                  <Link to={`/room/${this.state.roomName}`}>
                    <button className={classes.button}>
                      {this.state.openJoinGameSettings
                        ? "Continue to Game..."
                        : "Create Game"}
                    </button>
                  </Link>
                </form>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
