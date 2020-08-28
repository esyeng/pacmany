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
    // generateGameCode();
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
              <Link to={`/room/${gameCode}`}>
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

// socket game logic notes, unused

// -- mongoose - import and create db.js with env var
// -- create new schema with mongoose

// this.socket = io("http://localhost:8080");
// this.socket.on("connect", (socket) => {
// console.log("connected");
// if (this.players.length < 4) {
// if (this.players.length === 1) {
// this.player2 = new Player(500, 500, "blue");
// this.player2.port = 2;
// this.player2.id = socket.id;
// this.players.push(this.player2);
// }
// } else if (this.players.length === 2) {
// this.player3 = new Player(500, 500, "black");
// this.player3.port = 3;
// this.player3.id = socket.id;
// this.players.push(this.player3);
// } else if (this.players.length === 3) {
// this.player4 = new Player(500, 500, "pink");
// this.player4.port = 4;
// this.player4.id = socket.id;
// this.players.push(this.player4);
// } else {
// console.log("room full");
// }
// });
// this.socket.on("disconnect", (socket) => {
// console.log(`Player ${this.playerA.port} has left the game`);
// this.players = this.players.filter((player) => player.id !== socket.id);
// });
