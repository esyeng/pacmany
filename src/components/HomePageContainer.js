import React, { Fragment, Component } from "react";
import { withStyles, Box } from "@material-ui/core";
import HomePage from "./HomePage";
import styles from "./styles";

class HomePageContainer extends Component {
  render() {
    return (
      <Fragment>
        <HomePage height="85vh" />
        <Box height={60} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(HomePageContainer);
