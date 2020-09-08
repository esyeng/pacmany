import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const pacmanImages = [
  "https://www.mapleprimes.com/view.aspx?sf=95737/279328/pacman.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS5ndsOlRu4gM81pI6QGupkpKh0glBDW0ywHw&usqp=CAU",
  "https://vignette.wikia.nocookie.net/p__/images/d/de/Blue_Pac-Man.jpg/revision/latest/scale-to-width-down/340?cb=20180109150426&path-prefix=protagonist",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSln1UOdFzjxRoac9ZYLjPCzWP8-gyDeq0KZQ&usqp=CAU",
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "350px",
    display: "flex",
    margin: "5%",
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
            return (
              <Card key={player.id} className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      Player {player.id + 1}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      @{player.name}
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
                            <span>Player {player.id + 1} died.</span>
                          </div>
                        </div>
                      )}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={pacmanImages[player.id]}
                />
              </Card>
            );
          })
        ) : (
          <div style={{ color: "white" }}>No Players </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};
