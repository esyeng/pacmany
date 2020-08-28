// let players = [];
// let roomCount = 0;

// module.exports = (io) => {
//   players,
//     roomCount,
//     io.on("connection", (socket) => {
//       console.log("connected", socket.id);
//       socket.on("gameload", () => {
//         io.broadcast.emit("currentPlayers", players);
//       });
//       socket.on("joinRoom", (socket) => {
//         console.log(`User number ${socket.id} entered the game`);
//         switch (socket) {
//           case roomCount === 0:
//             const player1 = {
//               port: 1,
//               id: socket.id,
//             };
//             socket.broadcast.emit("newPlayer", player1);
//             players.push(player1);
//             roomCount++;
//           case roomCount === 1:
//             const player2 = {
//               port: 2,
//               id: socket.id,
//             };
//             socket.broadcast.emit("newPlayer", player2);
//             players.push(player2);
//             roomCount++;
//           case roomCount === 2:
//             const player3 = {
//               port: 3,
//               id: socket.id,
//             };
//             socket.broadcast.emit("newPlayer", player3);
//             players.push(player3);
//           case roomCount === 3:
//             const player4 = {
//               port: 4,
//               id: socket.id,
//             };
//             socket.broadcast.emit("newPlayer", player4);
//             players.push(player4);
//             roomCount++;
//           case roomCount === 4:
//             console.log("Sorry, this room is PACed");
//             return "Sorry, this room is PACed";
//         }
//         players[roomCount] = {
//           rotation: 0,
//           x: Math.floor(Math.random() * 700) + 50,
//           y: Math.floor(Math.random() * 500) + 50,
//         };
//       });
//       socket.on("disconnect", () => {
//         console.log("User left: " + socket.id);
//         if (!players.length) {
//           console.log(`guest ${socket.id} disconnected`);
//           io.emit("disconnect", socket.id);
//         } else {
//           players = players.filter((player) => player.id !== socket.id);
//           io.emit("disconnect", socket.id);
//         }
//       });
//     });
// };
