import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePageContainer from "./components/HomePageContainer";
import GamePage from "./components/GamePage";
import RoomAtCapacity from "./components/RoomAtCapacity";
import InvalidRoom from "./components/InvalidRoom";

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePageContainer} />
            <Route
              exact
              path="/host/:userName/room/:roomCode"
              component={GamePage}
            />
            <Route
              exact
              path="/guest/:userName/room/:roomCode"
              component={GamePage}
            />
            <Route
              exact
              path="/singlePlayer/:userName/room/:roomCode"
              component={GamePage}
            />
            <Route exact path="/roomAtCapacity" component={RoomAtCapacity} />
            <Route exact path="/invalidRoom" component={InvalidRoom} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes;
