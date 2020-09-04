import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePageContainer from "./components/HomePageContainer";
import GamePage from "./components/GamePage";
import Demo from "./components/Demo";
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
            <Route exact path="/demo" component={Demo} />
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
