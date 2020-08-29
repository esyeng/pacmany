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
import socket from "../scenes/SocketHub.js";
import CreateRoom, { newKey } from "./CreateRoom";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      showStartButton: true,
      openGameSettings: false,
      gameCode: "",
      openJoinGameSettings: false,
      username: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.handleNameEntry = this.handleNameEntry.bind(this);
    this.handleOpenGameSettings = this.handleOpenGameSettings.bind(this);
    this.handleCloseGameSettings = this.handleCloseGameSettings.bind(this);
    // this.listen = this.listen.bind(this);
    this.enterKey = this.enterKey.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    // this.listen();
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

  handleOpenGameSettings(e) {
    this.setState({
      openModal: false,
      openGameSettings: true,
    });
    if (e.target.name === "joinGame") {
      this.setState({
        openJoinGameSettings: true,
      });
    }
  }

  // handleNameEntry(e) {
  //   this.setState({
  //     [e.target.name]: [e.target.name.value],
  //   });
  // }

  handleCloseGameSettings() {
    this.setState({
      openModal: true,
      openGameSettings: false,
      openJoinGameSettings: false,
    });
  }

  enterKey(e) {
    this.setState({
      gameCode: e.target.value,
    });
  }

  joinGame() {
    let gameCode = this.state.gameCode;
    let name = this.state.name;
    socket.emit("joinRoom", gameCode, name);
    this.setState({ playerCount: playerCount++ });
    socket.on("newPlayers", function (players) {
      this.setState({ players: players });
    });
    socket.roomId = roomKey;
  }
  // listen() {
  //   socket.on("wrongRoom", (roomId) => {
  //     alert(`Game room: ${roomId} does not exist`);
  //   });
  //   socket.on("gameInProgress", (roomId) => {
  //     alert(`Sorry, the game at ${roomId} already started. Where were you?`);
  //     window.location.reload(false);
  //   });
  //   socket.on("returnToLobby", () => {
  //     this.setState({ gameEnded: true });
  //   });
  //   socket.on("gameStarted", () => {
  //     this.setState({ waitingForPlayers: false });
  //   });
  // }

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
          >
            TEST
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
                <Button
                  name="joinGame"
                  onClick={this.handleOpenGameSettings}
                  className={classes.modalButtons}
                >
                  Join Existing Game
                </Button>
                <Link to={`/room/${this.state.gameCode}`}>
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
                {this.state.openJoinGameSettings ? (
                  <form className={classes.form}>
                    <div>
                      <label>
                        <strong>Room Key: </strong>
                      </label>
                      <input
                        className={classes.inputField}
                        type="text"
                        name="name"
                        placeholder="Enter Game Code"
                        onChange={this.enterKey}
                      />
                    </div>
                  </form>
                ) : (
                  <div>
                    <CreateRoom />
                  </div>
                )}
                <Link to={`/room/${this.state.gameCode}`}>
                  <button className={classes.button}>
                    {this.state.openJoinGameSettings
                      ? "Continue to Game..."
                      : "Create Game"}
                  </button>
                </Link>
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
