import React, { Component } from "react";
import Advertises from "./Advertises";
import Dashboard from "./Dashboard";

class UserAds extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <Advertises title={"Advertises"} />
      </div>
    );
  }
}

export default UserAds;
