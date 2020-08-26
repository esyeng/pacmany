import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import styles from "./styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classnames from "classnames";
import { Link } from "react-router-dom";

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
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
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
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <Button
                onClick={handleOpenGameSettings}
                className={classes.modalButtons}
              >
                Start New Game
              </Button>
              <Button
                onClick={handleOpenJoinGameSettings}
                className={classes.modalButtons}
              >
                Join Existing Game
              </Button>
              <Button className={classes.modalButtons}>Play on your own</Button>
            </div>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openGameSettings}
          onClose={handleCloseGameSettings}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openGameSettings}>
            <div className={classes.paper}>
              <form className={classes.form}>
                {openJoinGameSettings ? (
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
                    <strong>{gameCode}</strong>
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
                <Link to={`/room/${gameCode}`}>
                  <button className={classes.button}>
                    Continue to Game...
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

export default HomePage;
