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
              <Link to="/game">
                <Button className={classes.modalButtons}>Start New Game</Button>
              </Link>
              <Button className={classes.modalButtons}>
                Join Existing Game
              </Button>
              <Button className={classes.modalButtons}>Play on your own</Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default HomePage;
