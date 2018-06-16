import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Link } from "react-router-dom";
import profile from "../img/profile.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "personal-info"
    };
    this.renderContent = this.renderContent.bind(this);
  }
  renderContent() {
    if (this.props.user) {
      const user = this.props.user;
      const avatar = !!user.avatar ? `/api/img/${user.avatar}` : profile;
      return (
        <div>
          <section className="dashboard-header">
            <img src={avatar} className="dashboard-profile-pic" alt="avatar" />
            <h1>{user.name}</h1>
            <p className="center-align dashboard-address">
              <h3>
                <i className="small material-icons">location_on</i>{" "}
                {user.address ? user.address : "unknown"}
              </h3>
            </p>
            <div className="row container">
              <Link
                className="btn col s12 m6 l3 dashboard-profile-btn purple lighten-2"
                to={"/dashboard/personal_info"}
              >
                <i className="material-icons left">account_box</i>profile
              </Link>
              <Link
                className="btn col s12 m6 l3 dashboard-profile-btn indigo lighten-2 lighten-2"
                to={"/dashboard/advertises"}
              >
                <i className="material-icons left">assignment</i>advertises
              </Link>
              <Link
                className="btn col s12 m6 l3 dashboard-profile-btn grey darken-2 lighten-2"
                to={"/dashboard/fav_ads"}
              >
                <i className="material-icons left">star</i>favorite ads
              </Link>
              <Link
                className="btn col s12 m6 l3 dashboard-profile-btn orange lighten-2"
                to={`/dashboard/messages/${user._id}`}
              >
                <i className="material-icons left">message</i>messages
              </Link>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="progress ">
            <div className="indeterminate" />
          </div>
        </div>
      );
    }
  }

  render() {
    return <header>{this.renderContent()}</header>;
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
