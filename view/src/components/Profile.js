import React, { Component } from "react";
import { connect } from "react-redux";
import * as actios from "../actions/index";
import photo from "../img/profile.png";
import SimpleMap from "./Map";

class profile extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderConversation = this.renderConversation.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentWillMount() {
    this.props.fetchProfileInfo(this.props.match.params._id);
  }

  sendMessage() {
    this.props.sendMessage(this.props.profile._id);
  }

  renderConversation() {
    if (this.props.user && this.props.profile) {
      if (this.props.user._id !== this.props.profile._id) {
        return (
          <button
            className="btn yellow darken-3 col s12"
            onClick={this.sendMessage}
          >
            Send a message
          </button>
        );
      }
    }
  }

  renderContent() {
    if (!!this.props.profile) {
      const profile = this.props.profile;
      const avatar = profile.avatar ? `/api/img/${profile.avatar}` : photo;
      const info = [
        { label: "name", icon: "assignment_ind" },
        { label: "gender", icon: "wc" },
        { label: "job", icon: "work" },
        { label: "country", icon: "home" },
        { label: "region", icon: "location_city" },
        { label: "phone_number", icon: "contact_phone" },
        { label: "email", icon: "contact_mail" }
      ];

      return (
        <article className="row">
          <section className=" col s12 m4">
            <img src={avatar} className="responsive-img" alt="avatar" />
            <h3 className="center-align">{profile.name}</h3>
            <p className="center-align">
              <i className="small material-icons">location_on</i>{" "}
              {profile.address ? profile.address : "unknown"}
            </p>
            {this.renderConversation()}
          </section>
          <section className="col s8 m8 ">
            <ul>
              {info.map(e => {
                return (
                  <li key={e.label}>
                    <i className="small material-icons">{e.icon}</i>{" "}
                    <span className="informations">
                      {e.label} :{" "}
                      {profile[e.label] ? profile[e.label] : "--------"}
                    </span>
                  </li>
                );
              })}
            </ul>
            {profile.location && <SimpleMap location={profile.location} />}
          </section>
        </article>
      );
    } else {
      return (
        <div className="progress ">
          <div className="indeterminate" />
        </div>
      );
    }
  }

  render() {
    return <div className="container header">{this.renderContent()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    profile: state.profile,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  actios
)(profile);
