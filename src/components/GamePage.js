import React, { Component, useState, useEffect } from "react";
import Phaser from "phaser";
import { config } from "../config/config";
import io from "socket.io-client";
const socket = io("http://localhost:8080");

class GamePage extends Component {
  componentDidMount() {
    // console.log("In GamePage CDM");
    const game = new Phaser.Game(config);
  }
  render() {
    return <div style={{ color: "white" }}></div>;
  }
}

// export default function GamePage() {
//   const [game, setGame] = useState("");
//   const [initialize, setInitialize] = useState(false);

//   useEffect(() => {
//     if (initialize) {
//       setGame(new Phaser.Game(config));
//     }
//   }, [initialize]);
//   return (
// <div>
//   <div style={{ border: "2px solid black" }}>high scores</div>
//   <div
//     style={{
//       width: "1000px",
//       height: "1000px",
//       border: "2px solid black",
//     }}
//   >
//     <IonPhaser game={game} initialize={true} />
//   </div>
//   <div style={{ border: "2px solid black" }}>chat room</div>
//   <div className=" ">
//     <a href="#1" className="bttn">
//       Destroy
//     </a>
//   </div>
// </div>

//     <div
//       style={{
//         width: "200px",
//         height: "200px",
//         border: "2px solid black",
//         display: "flex",
//         flexDirection: "row",
//       }}
//     >
//       <div className="flex">
//         <a href="#1" className="bttn" onClick={() => setInitialize(true)}>
//           Initialize
//         </a>
//       </div>
//       <button>hi</button>
//       <IonPhaser game={game} initialize={initialize} />
//       <div>button</div>
//     </div>
//   );
// }

export default GamePage;
