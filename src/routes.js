import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import HomePageContainer from "./components/HomePageContainer";
import GamePage from "./components/GamePage";
import { gameKey } from "./scenes/MainScene";
/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePageContainer} />
            <Route exact path="/room/:roomCode" component={GamePage} />
            <Route exact path="/game" component={GamePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes;
