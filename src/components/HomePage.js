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

export let hash = "";
const useStyles = makeStyles(styles);

function HomePage(props) {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [showButton, setButton] = React.useState(true);
  const [openGameSettings, setOpenGameSettings] = React.useState(false);
  const [gameCode, setGameCode] = React.useState(0);
  const [openJoinGameSettings, setJoinGameSettings] = React.useState(false);

  const handleOpen = (e) => {
    setOpen(true);
    setButton(false);
  };

  const handleClose = () => {
    setOpen(false);
    setButton(true);
  };

  const handleCreateNewGame = () => {
    setOpen(false);
  };

  const handleOpenGameSettings = () => {
    setOpen(false);
    generateGameCode();
    setOpenGameSettings(true);
  };

  const handleCloseGameSettings = () => {
    setButton(true);
    setOpenGameSettings(false);
    setJoinGameSettings(false);
  };

  const handleOpenJoinGameSettings = () => {
    setOpen(false);
    setOpenGameSettings(true);
    setJoinGameSettings(true);
  };

  const generateGameCode = () => {
=======
import socket from "../scenes/SocketHub.js";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      showStartButton: true,
      openGameSettings: false,
      gameCode: 0,
      openJoinGameSettings: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenGameSettings = this.handleOpenGameSettings.bind(this);
    this.handleCloseGameSettings = this.handleCloseGameSettings.bind(this);
    this.generateGameCode = this.generateGameCode.bind(this);
    this.listen = this.listen.bind(this);
  }

  componentDidMount() {
    this.listen();
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
    } else {
      this.generateGameCode();
    }
  }

  handleCloseGameSettings() {
    this.setState({
      openModal: true,
      openGameSettings: false,
      openJoinGameSettings: false,
    });
  }

  generateGameCode() {

    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    hash = result;
    setGameCode(result);
  };
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
          onClick={handleOpen}
        >
          TEST
          <ArrowRightAlt className={classes.buttonIcon} />
        </Button>
      </Link>
      <div className={classes.gameActions}>
        <Button
          className={classnames(classes.button, classes.startPlaying)}
          onClick={handleOpen}
          style={showButton ? { display: "" } : { display: "none" }}
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
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
=======
    this.setState({
      gameCode: result,
    });
  }

  listen() {
    socket.on("wrongRoom", (roomId) => {
      alert(`Game room: ${roomId} does not exist`);
    });
    socket.on("gameInProgress", (roomId) => {
      alert(`Sorry, the game at ${roomId} already started. Where were you?`);
      window.location.reload(false);
    });
    socket.on("returnToLobby", () => {
      this.setState({ gameEnded: true });
    });
    socket.on("gameStarted", () => {
      this.setState({ waitingForPlayers: false });
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
        <Link to="game">
          <Button
            style={{ backgroundColor: "black" }}
            className={classnames(classes.button, classes.startPlaying)}
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
                <form className={classes.form}>
                  {this.state.openJoinGameSettings ? (
                    <div>
                      <label>
                        <strong>Code: </strong>
                      </label>
                      <input
                        className={classes.inputField}
                        type="text"
                        name="name"
                        placeholder="Enter Game Code"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className={classes.gameCodeHeader}>
                        Your Game Code is{" "}
                      </span>
                      <strong>{this.state.gameCode}</strong>
                    </div>
                  )}
                  <div>
                    <label>
                      <strong>Name: </strong>
                    </label>
                    <input
                      className={classes.inputField}
                      type="text"
                      name="name"
                      placeholder="Enter Player Name"
                    />
                  </div>
                  <Link to={`/room/${this.state.gameCode}`}>
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
