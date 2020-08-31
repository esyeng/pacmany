
class Room {
  constructor(roomKey) {
    this.key = roomKey;
    this.playerCount = 0;
    this.sockets = [];
    this.players = {};
    this.started = false;
  }
}

// function joinUser(socketId, roomKey, userName) {
//   const room = rooms[roomKey];
//   console.log(socketId);
//   console.log(userName);
//   const user = {
//     socketId,
//     userName,
//     roomKey,
//   };
//   users.push(user);
//   console.log(room.players);
//   room.players.push(user);
//   console.log(`Look at this fuckin user ==> ${user}`);
//   return user;
// }

// function removeUser(id) {
//   const getID = users.socketID === id;
//   const index = user.findIndex(getID);
//   if (index !== -1) {
//     return user.splice(index, 1)[0];
//   }
// }
// ;

const joinRoom = (socket, room, playerName) => {
  console.log(`room is: ${(room, room.key)}`);
  // if (!room.playerCount > 4) {

  socket.emit("newPlayers", room.players);
  // } else {
  //   alert("room full");
  // }
};

server.listen(PORT, async () => {
  try {
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});

io.on("connection", function (socket) {
  console.log("a new client has connected", socket.id);

  socket.on("createRoom", function (roomKey) {
    console.log("I heard you're trying to make a room");
    room = new Room(roomKey);

    rooms[room] = room;
    console.log(rooms);
    joinRoom(socket, room);
  });

  socket.on("joinRoom", function (roomKey) {
    const room = rooms[roomKey];
    if (room) {
      console.log(`player ${socket.id} joining room ${roomKey}`);
      joinRoom(socket, room.key);
    } else {
      console.log(`Room ${roomKey} not found`);
      socket.emit("wrongRoom", roomKey);
    }
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected: " + socket.id);
    io.emit("disconnect", socket.id);
  });
});











// const useStyles = makeStyles(styles);

// function HomePage(props) {
//   const classes = useStyles(props);
//   const [open, setOpen] = React.useState(false);
//   const [showButton, setButton] = React.useState(true);
//   const [openGameSettings, setOpenGameSettings] = React.useState(false);
//   const [gameCode, setGameCode] = React.useState(0);
//   const [openJoinGameSettings, setJoinGameSettings] = React.useState(false);

//   const handleOpen = (e) => {
//     setOpen(true);
//     setButton(false);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setButton(true);
//   };

//   const handleCreateNewGame = () => {
//     setOpen(false);
//   };

//   const handleOpenGameSettings = () => {
//     setOpen(false);
//     // generateGameCode();
//     setOpenGameSettings(true);
//   };

//   const handleCloseGameSettings = () => {
//     setButton(true);
//     setOpenGameSettings(false);
//     setJoinGameSettings(false);
//   };

//   const handleOpenJoinGameSettings = () => {
//     setOpen(false);
//     setOpenGameSettings(true);
//     setJoinGameSettings(true);
//   };

//   return (
//     <div className={classes.gameHero}>
//       <div className={classes.infoSection}>
//         <header className={classes.movieHeader}>
//           <h1>Welcome to Pac-Many</h1>
//         </header>
//       </div>
//       <div
//         className={classes.blurBackground}
//         style={{
//           backgroundImage: `url(https://www.hivplusmag.com/sites/default/files/2017/10/20/pac-man-x750.jpg)`,
//         }}
//       />
//       <Link to="game">
//         <Button
//           style={{ backgroundColor: "black" }}
//           className={classnames(classes.button, classes.startPlaying)}
//           onClick={handleOpen}
//         >
//           TEST
//           <ArrowRightAlt className={classes.buttonIcon} />
//         </Button>
//       </Link>
//       <div className={classes.gameActions}>
//         <Button
//           className={classnames(classes.button, classes.startPlaying)}
//           onClick={handleOpen}
//           style={showButton ? { display: "" } : { display: "none" }}
//         >
//           Start playing
//           <ArrowRightAlt className={classes.buttonIcon} />
//         </Button>
//       </div>
//       <div>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           className={classes.modal}
//           open={open}
//           onClose={handleClose}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={open}>
//             <div className={classes.paper}>
//               <Button
//                 onClick={handleOpenGameSettings}
//                 className={classes.modalButtons}
//               >
//                 Start New Game
//               </Button>
//               <Button
//                 onClick={handleOpenJoinGameSettings}
//                 className={classes.modalButtons}
//               >
//                 Join Existing Game
//               </Button>
//               <Link to={`/room/${gameCode}`}>
//                 <Button className={classes.modalButtons}>
//                   Play on your own
//                 </Button>
//               </Link>
//             </div>
//           </Fade>
//         </Modal>
//       </div>

//       <div>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           className={classes.modal}
//           open={openGameSettings}
//           onClose={handleCloseGameSettings}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={openGameSettings}>
//             <div className={classes.paper}>
//               <form className={classes.form}>
//                 {openJoinGameSettings ? (
//                   <div>
//                     <label>
//                       <strong>Code: </strong>
//                     </label>
//                     <input
//                       className={classes.inputField}
//                       type="text"
//                       name="name"
//                       placeholder="Enter Game Code"
//                     />
//                   </div>
//                 ) : (
//                   <div>
//                     <span className={classes.gameCodeHeader}>
//                       Your Game Code is{" "}
//                     </span>
//                     <strong>{gameCode}</strong>
//                   </div>
//                 )}
//                 <div>
//                   <label>
//                     <strong>Name: </strong>
//                   </label>
//                   <input
//                     className={classes.inputField}
//                     type="text"
//                     name="name"
//                     placeholder="Enter Player Name"
//                   />
//                 </div>
//                 <Link to={`/room/${gameCode}`}>
//                   <button className={classes.button}>
//                     Continue to Game...
//                   </button>
//                 </Link>
//               </form>
//             </div>
//           </Fade>
//         </Modal>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// // socket game logic notes, unused

// // -- mongoose - import and create db.js with env var
// // -- create new schema with mongoose

// // this.socket = io("http://localhost:8080");
// // this.socket.on("connect", (socket) => {
// // console.log("connected");
// // if (this.players.length < 4) {
// // if (this.players.length === 1) {
// // this.player2 = new Player(500, 500, "blue");
// // this.player2.port = 2;
// // this.player2.id = socket.id;
// // this.players.push(this.player2);
// // }
// // } else if (this.players.length === 2) {
// // this.player3 = new Player(500, 500, "black");
// // this.player3.port = 3;
// // this.player3.id = socket.id;
// // this.players.push(this.player3);
// // } else if (this.players.length === 3) {
// // this.player4 = new Player(500, 500, "pink");
// // this.player4.port = 4;
// // this.player4.id = socket.id;
// // this.players.push(this.player4);
// // } else {
// // console.log("room full");
// // }
// // });
// // this.socket.on("disconnect", (socket) => {
// // console.log(`Player ${this.playerA.port} has left the game`);
// // this.players = this.players.filter((player) => player.id !== socket.id);
// // });

// room.players[socket.id] = {
//   x: 125,
//   y: 233,
//   rotation: 0,
//   name: name,
//   score: 0,
//   playerId: socket.id,
//   playerNumber: room.playerCount,
// };

// function generateGameCode() {
//   let result = "";
//   let characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let charactersLength = characters.length;
//   for (let i = 0; i < 5; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   this.setState({
//     gameCode: result,
//   });
// }

generateGameCode() {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import styles from "./styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classnames from "classnames";
import { Link, Redirect } from "react-router-dom";
import socket, { generateGameCode } from "../scenes/SocketHub.js";
// let userName = prompt("Your Name, please");
// let roomName = prompt("room name");

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      showStartButton: true,
      openGameSettings: false,
      gameCode: 0,
      openJoinGameSettings: false,
      openNewGameSettings: false,
      username: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleNameEntry = this.handleNameEntry.bind(this);
    this.handleOpenGameSettings = this.handleOpenGameSettings.bind(this);
    this.handleCloseGameSettings = this.handleCloseGameSettings.bind(this);
    this.listen = this.listen.bind(this);
    this.createGame = this.createGame.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.joinGame = this.joinGame.bind(this);
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
    } else if (e.target.name === "createGame") {
      this.setState({
        openNewGameSettings: true,
      });
    }
  }

  handleNameEntry(e) {
    this.setState({
      [e.target.name]: [e.target.name.value],
    });
  }

  handleCloseGameSettings() {
    this.setState({
      openModal: true,
      openGameSettings: false,
      openJoinGameSettings: false,
    });
  }

  handleNew() {
    this.createGame();
    return <Link to={`/room/${this.state.gameCode}`}></Link>;
  }
  createGame() {
    let username = this.state.username;
    let gameCode = generateGameCode();
    this.setState({ gameCode: gameCode });
    this.setState({ playerCount: 1 });
    console.log(`Creating game at: room/${gameCode}`);
    socket.emit("createRoom", gameCode, username);
  }
  joinGame() {
    let roomKey = this.state.roomKey;
    let name = this.state.name;
    socket.emit("joinRoom", roomKey, name);
    this.setState({ playerCount: playerCount++ });
    socket.on("newPlayers", function (players) {
      this.setState({ players: players });
    });
    socket.roomId = roomKey;
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
                      <Link to={`/room/${this.state.gameCode}`}>
                        <button className={classes.button}>Join Game</button>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.openNewGameSettings ? (
                    <div>
                      <div>
                        <span className={classes.gameCodeHeader}>
                          Player 1, enter your name
                        </span>
                        {/* <strong>{this.state.gameCode}</strong> */}
                      </div>
                      <div>
                        <label>
                          <strong>Name: </strong>
                        </label>
                        <input
                          className={classes.inputField}
                          type="text"
                          name="name"
                          placeholder="Enter Player Name"
                          // onClick={this.createGame}
                        />
                      </div>
                      <button
                        className={classes.button}
                        onClick={this.handleNew}
                      ></button>
                    </div>
                  ) : (
                    ""
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
console.log(HomePage);

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
