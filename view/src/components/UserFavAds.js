import React, { Component } from "react";
import Ads from "./Ads";
import Dashboard from "./Dashboard";
class UserFavAds extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <Ads title="Favorite Ads" />
      </div>
    );
  }
}

export default UserFavAds;
