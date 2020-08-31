
// let players = [];
// let roomCount = 0;
// let userName = "";
// let users = [];
// let thisRoom = "";
// function joinUser(socketId, userName, roomName) {
//   const user = {
//     socketId,
//     userName,
//     roomName,
//   };
//   users.push(user);
//   return user;
// }

// // function removeUser(id) {
// //   const getID = users.socketID === id;
// //   const index = users.indexOf(getID);
// //   if (index !== -1) {
// //     return user.splice(index, 1)[0];
// //   }
// // }
// function getName(id) {
//   const arr = users.filter((obj) => obj.socketID === id);
//   if (arr) {
//     return arr[0].userName;
//   }
// }

// module.exports = (io) => {
//   io.on("connection", function (socket) {
//     console.log("A user connected: " + socket.id);

//     socket.on("join room", function (data) {
//       console.log("in room server");
//       let newUser = joinUser(socket.id, data.userName, data.roomName);
//       socket.emit("send data", {
//         id: socket.id,
//         userName: newUser.userName,
//         roomName: newUser.roomName,
//       });
//       socket.on("getData", function () {
//         const data = {
//           id: socket.id,
//           userName: newUser.userName,
//           roomName: newUser.roomName,
//         };
//         socket.emit("dataSent", data);
//       });
//       thisRoom = newUser.roomName;
//       console.log(newUser);
//       console.log("Total users :", users);
//       socket.join(newUser.roomName);
//     });

//     socket.on("chat message", function (data) {
//       const name = getName(data.id);
//       io.to(thisRoom).emit("chat message", { data: data, name: name });
//       // io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
//       io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
//     });

//     socket.on("subscribe", function (data) {
//       console.log("subscription in index.js-sockets-server-side");
//       const room_data = JSON.parse(data);
//       userName = room_data.userName;
//       const roomName = room_data.roomName;

//       socket.join(`${roomName}`);
//       console.log(`userName : ${userName} joined Room Name : ${roomName}`);
//       io.to(`${roomName}`).emit("newUserToGameRoom", userName);
//     });

//     socket.on("unsubscribe", function (data) {
//       console.log("un-subscribe sockets-server-side");
//       const room_data = JSON.parse(data);
//       userName = room_data.userName;
//       const roomName = room_data.roomName;

//       console.log(`userName : ${userName} left Room Name : ${roomName}`);
//       socket.broadcast.to(`${roomName}`).emit("userLeftGameRoom", userName);
//       socket.leave(`${roomName}`);
//     });

//     socket.on("disconnect", () => {
//       console.log("one of the sockets disconnected");
//     });
//   });
// };

let userName = "";
let users = [];
let thisRoom = "";
function joinUser(socketId, userName, roomName) {
  const user = {
    socketId,
    userName,
    roomName,
  };
  users.push(user);
  return user;
}

// function removeUser(id) {
//   const getID = users.socketID === id;
//   const index = users.indexOf(getID);
//   if (index !== -1) {
//     return user.splice(index, 1)[0];
//   }
// }
function getName(id) {
  const arr = users.filter((obj) => obj.socketID === id);
  if (arr) {
    return arr[0].userName;
  }
}
module.exports = (io) => {
  io.on("connection", function (socket) {
    console.log("A user connected: " + socket.id);

    socket.on("join room", function (data) {
      console.log("in room server");
      let newUser = joinUser(socket.id, data.userName, data.roomName);
      socket.emit("send data", {
        id: socket.id,
        userName: newUser.userName,
        roomName: newUser.roomName,
      });
      thisRoom = newUser.roomName;
      console.log(newUser);
      console.log("Total users :", users);
      socket.join(newUser.roomName);
    });

    socket.on("chat message", function (data) {
      const name = getName(data.id);
      io.to(thisRoom).emit("chat message", { data: data, name: name });
      // io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
      io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
    });

    socket.on("subscribe", function (data) {
      console.log("subscription in index.js-sockets-server-side");
      const room_data = JSON.parse(data);
      userName = room_data.userName;
      const roomName = room_data.roomName;

      socket.join(`${roomName}`);
      console.log(`userName : ${userName} joined Room Name : ${roomName}`);
      io.to(`${roomName}`).emit("newUserToGameRoom", userName);
    });

    socket.on("unsubscribe", function (data) {
      console.log("un-subscribe sockets-server-side");
      const room_data = JSON.parse(data);
      userName = room_data.userName;
      const roomName = room_data.roomName;

      console.log(`userName : ${userName} left Room Name : ${roomName}`);
      socket.broadcast.to(`${roomName}`).emit("userLeftGameRoom", userName);
      socket.leave(`${roomName}`);
    });

    socket.on("disconnect", () => {
      console.log("one of the sockets disconnected");
    });
  });
};

