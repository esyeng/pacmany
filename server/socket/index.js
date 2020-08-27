let players = [];
let roomCount = 0;

module.exports = (io) => {
  players,
    roomCount,
    io.on("connection", function (socket) {
      console.log("A user connected: " + socket.id);

      players.push(socket.id);

      io.on("connection", (socket) => {
        console.log("connected", socket.id);
        socket.on("test", (counter) => {
          console.log("message received in socket-index.js", counter);
        });
        socket.on("gameload", () => {
          io.broadcast.emit("currentPlayers", players);
        });
        socket.on("joinRoom", (room) => {
          socket.join(room, socket.id);
          console.log(`User number ${socket.id} entered the game ${room}`);

          //
          socket.on("disconnect", () => {
            // console.log("User left: " + socket.id);
            if (!players.length) {
              // console.log(`guest ${socket.id} disconnected`);
              io.emit("disconnect", socket.id);
            } else {
              players = players.filter((player) => player.id !== socket.id);
              io.emit("disconnect", socket.id);
            }
          });
        });
      });
    });
};
