import io from "socket.io-client";
// import {players, roomCount} from "../../server/socket/index";

const socket = io("http://localhost:8080/");

socket.on("connection", (socket) => {
  console.log("YEEEEEEEG");
});

export default socket;
