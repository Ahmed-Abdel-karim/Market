import React, { Component } from "react";
import Ads from "./Ads";
import Dashboard from "./Dashboard";

class UserAds extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <Ads title={"Ads"} />
      </div>
    );
  }
}

export default UserAds;
