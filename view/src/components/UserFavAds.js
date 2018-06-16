import React, { Component } from "react";
import Advertises from "./Advertises";
import Dashboard from "./Dashboard";
class UserFavAds extends Component {
  render() {
    return (
      <div>
        <Dashboard />
        <Advertises title="Favorite Ads" />
      </div>
    );
  }
}

export default UserFavAds;
