import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
  const gameStarted = props.gameStarted;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Game
            </Typography>
            <Typography component="h5" variant="h5">
              Options
            </Typography>
          </CardContent>
        </div>
        <hr />

        <CardContent className={classes.cover}>
          <Button id="enterCardButton">Enter</Button>
          <Button id="leaveCardButton" onClick={props.goBack}>
            Leave
          </Button>
        </CardContent>
      </Card>

      <Button disabled={props.gameStarted() ? true : false} id="allInButton">
        All In?
      </Button>
    </div>
  );
};
