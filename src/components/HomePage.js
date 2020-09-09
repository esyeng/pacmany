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
import { CopyToClipboard } from "react-copy-to-clipboard";

var Client = require("../client");

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      showStartButton: true,
      openGameSettings: false,
      userName: "",
      roomName: 0,
      openJoinGameSettings: false,
      players: [],
      playerCount: 0,
      codeCopied: false,
      singlePlayer: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenGameSettings = this.handleOpenGameSettings.bind(this);
    this.handleOpenJoinGameSettings = this.handleOpenJoinGameSettings.bind(
      this
    );
    this.handleCloseGameSettings = this.handleCloseGameSettings.bind(this);
    this.generateRoomName = this.generateRoomName.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createGame = this.createGame.bind(this);
    this.alertCopied = this.alertCopied.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.handleSinglePlayerGame = this.handleSinglePlayerGame.bind(this);
  }
  createGame() {
    Client.Client.socket.emit("createRoom", {
      userName: this.state.userName,
      roomCode: this.state.roomName,
    });
  }

  alertCopied() {
    this.setState({
      codeCopied: true,
    });
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
    this.openSettings();
    this.generateRoomName();
  }

  handleSinglePlayerGame() {
    this.openSettings();
    this.setState({
      singlePlayer: true,
    });
  }

  openSettings() {
    this.setState({
      openModal: false,
      openGameSettings: true,
    });
  }

  handleOpenJoinGameSettings() {
    this.openSettings();
    this.setState({
      openJoinGameSettings: true,
    });
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
                  onClick={this.handleOpenJoinGameSettings}
                  className={classes.modalButtons}
                >
                  Join Existing Game
                </Button>
                <Button
                  name="createGame"
                  onClick={this.handleSinglePlayerGame}
                  className={classes.modalButtons}
                >
                  Play on your own
                </Button>
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
                  ) : this.state.singlePlayer ? (
                    <span></span>
                  ) : (
                    <div>
                      <div>
                        <span className={classes.roomNameHeader}>
                          Your Game Code is{" "}
                        </span>
                      </div>
                      <div>
                        <CopyToClipboard
                          text={this.state.roomName}
                          onCopy={this.alertCopied}
                        >
                          <span>{this.state.roomName}</span>
                        </CopyToClipboard>
                      </div>
                      <div style={{ fontSize: "10px", fontStyle: "italic" }}>
                        <div>
                          {this.state.codeCopied ? (
                            <div>
                              <br />
                              <span>Code Copy, enjoy Pac-Many!</span>
                            </div>
                          ) : (
                            <span>Click to Code to Share.</span>
                          )}
                        </div>
                      </div>
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
                  {!this.state.openJoinGameSettings &&
                  !this.state.singlePlayer ? (
                    <Link
                      to={`/host/${this.state.userName}/room/${this.state.roomName}`}
                    >
                      <button
                        className={classes.button}
                        onClick={this.createGame}
                      >
                        Create Game
                      </button>
                    </Link>
                  ) : this.state.singlePlayer ? (
                    <Link to={`/singlePlayer/${this.state.userName}/room/0`}>
                      <button
                        className={classes.button}
                        onClick={this.createGame}
                      >
                        Continue To Game...
                      </button>
                    </Link>
                  ) : (
                    <Link
                      to={`/guest/${this.state.userName}/room/${this.state.roomName}`}
                    >
                      <button className={classes.button}>
                        Continue To Game...
                      </button>
                    </Link>
                  )}
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
