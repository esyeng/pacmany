module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("gameload", () => {
      socket.emit("currentPlayers", players);
    });
    socket.on("joinGame", () => {
      roomCount++;
      players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        color:
          roomCount === 1
            ? "yellow"
            : roomCount === 2
            ? "blue"
            : roomCount === 3
            ? "red"
            : roomCount === 4
            ? "green"
            : "",
      };
      console.log("New Player: ", players[socket.id]);
      socket.broadcast.emit("newPlayer", players[socket.id]);
      if (players[socket.id].color === "yellow") {
        io.emit("isPlayer1");
      } else if (players[socket.id].color === "blue") {
        io.emit("isPlayer2");
      } else if (players[socket.id].color === "red") {
        io.emit("isPlayer3");
      } else if (players[socket.id].color === "green") {
        io.emit("isPlayer4");
      }
    });

    socket.on("disconnect", () => {
      console.log("User left: " + socket.id);
      if (players.length <= 0) {
        console.log(`guest ${socket.id} disconnected`);
      } else {
        players = players.filter((player) => player.playerId !== socket.id);
        io.emit("disconnect", socket.id);
      }
    });
  });
};
