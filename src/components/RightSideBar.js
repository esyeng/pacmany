import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "350px",
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 191,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  enterButton: {
    width: "200px",
    backgroundColor: "green",
    color: "purple",
  },
}));

export const RightSideBar = (props) => {
  const [allIn, setAllIn] = useState(false);
  const roomCode = props.roomCode;
  const [alertCopied, setAlertCopied] = useState(false);
  const classes = useStyles();
  const handleAllInClick = () => {
    setAllIn(true);
    props.startGame();
  };

  const handleAlertCopied = () => {
    setAlertCopied(true);
  };
  return (
    <div>
      <div id="gameOptionButtons">
        {props.isSinglePlayer ? (
          <div></div>
        ) : (
          <div id="codeChildButton">
            <span>Room Code</span>
            <br />
            <div style={{ fontSize: "10px", fontStyle: "italic" }}>
              {alertCopied ? (
                <div>
                  <br />
                  <span>Code Copy, enjoy!</span>
                </div>
              ) : (
                <span>Click to Code to Share.</span>
              )}
            </div>
            <CardContent className={classes.cover}>
              <CopyToClipboard text={roomCode} onCopy={handleAlertCopied}>
                <span>{roomCode}</span>
              </CopyToClipboard>
            </CardContent>
          </div>
        )}

        {props.isHost ? (
          <Button id="startChildButton" onClick={handleAllInClick}>
            START GAME
          </Button>
        ) : (
          <span></span>
        )}
        <Button id="leaveChildButton">
          <Link id="leaveGameLink" to="/">
            LEAVE GAME
          </Link>
        </Button>
      </div>

      {props.isHost && props.notEnoughPlayers ? (
        <div style={{ color: "red" }}>
          <h4>Please wait for all players to enter the room.</h4>
        </div>
      ) : (
        <div></div>
      )}
      {props.gameStarted ? (
        <div style={{ color: "red" }}>
          <h4>Game started!</h4>
        </div>
      ) : (
        <div style={{ color: "red" }}>
          <h4>Waiting for host to start the game...</h4>
        </div>
      )}
    </div>
  );
};
