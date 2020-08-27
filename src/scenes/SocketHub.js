import io from "socket.io-client";
import createClientSocket from "socket.io-client";
// import {players, roomCount} from "../../server/socket/index";

const socket = io("http://localhost:8080/");

socket.on("connect", (socket) => {
  console.log("YEEEEEEEG");
});

export default socket;
