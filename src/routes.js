import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import HomePageContainer from "./components/HomePageContainer";
import GamePage from "./components/GamePage";

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/game" component={GamePage} />
        </Switch>
      </Router>
    );
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default Routes;
