import io from "socket.io-client";
// import {players, roomCount} from "../../server/socket/index";

export function createGameKey() {
  let key = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return key;
}

const socket = io("http://localhost:8080/");

socket.on("connect", (socket) => {});

export default socket;
