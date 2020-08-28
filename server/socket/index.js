let userName = "";
let users = [];

function joinUser(socketId, userName, roomName) {
  const user = {
    socketId,
    userName,
    roomName,
  };
  users.push(user);
  return user;
}

function removeUser(id) {
  const getID = users.socketID === id;
  const index = user.findIndex(getID);
  if (index !== -1) {
    return user.splice(index, 1)[0];
  }
}
module.exports = (io) => {
  io.on("connection", function (socket) {
    console.log("A user connected: " + socket.id);

    socket.on("join room", function (data) {
      console.log("in room -says server");
      let newUser = joinUser(socket.id, data.userName, data.roomName);
      socket.emit("send data", {
        id: socket.id,
        userName: newUser.userName,
        roomName: newUser.roomName,
      });
      thisRoom = newUser.roomName;
      console.log(newUser);
      socket.join(newUser.roomName);
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
