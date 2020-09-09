import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const pacmanImages = [
  "https://www.mapleprimes.com/view.aspx?sf=95737/279328/pacman.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5ndsOlRu4gM81pI6QGupkpKh0glBDW0ywHw&usqp=CAU",
  "data:image/png;base64,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",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSln1UOdFzjxRoac9ZYLjPCzWP8-gyDeq0KZQ&usqp=CAU",
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "310px",
    maxHeight: "170px",
    display: "flex",
    margin: "5%",
    marginRight: "10%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 201,
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
}));

export const LeftSideBar = (props) => {
  const classes = useStyles();
  let players = props.players;
  return (
    <div>
      <div>
        {players ? (
          players.map((player) => {
            let userName = player.userName || "";
            return (
              <Card key={player.id} className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  image={pacmanImages[player.id]}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                      Player {player.id + 1}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      @{userName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Score: {player.score}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {player.isAlive ? (
                        "Health: 1"
                      ) : (
                        <div>
                          <span>Health: 0</span>
                          <div>
                            <span>DIED.</span>
                          </div>
                        </div>
                      )}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            );
          })
        ) : (
          <div style={{ color: "white" }}>No Players </div>
        )}
      </div>
    </div>
  );
};
