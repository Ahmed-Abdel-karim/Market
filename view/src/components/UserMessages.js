import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Dashboard from "./Dashboard";
import photo from "../img/profile.png";
import moment from "moment";
class UserMessages extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentWillMount() {
    this.props.fetchUserConversations();
  }

  sendMessage(_id) {
    this.props.sendMessage(_id);
  }

  renderContent() {
    if (this.props.userConversations && this.props.user) {
      if (this.props.userConversations.length > 0) {
        const { user } = this.props;
        return this.props.userConversations.map(conv => {
          const { participants, _id, updatedAt, messages } = conv;
          const friend =
            participants[0]._id === user._id
              ? participants[1]
              : participants[0];
          const friend_id = friend._id;
          const avatar = friend.avatar ? `/api/img/${friend.avatar}` : photo;
          return (
            <div
              className="col s12 m3 "
              onClick={() => this.sendMessage(friend_id)}
              key={_id}
            >
              <div className="col s12 dashboard-conversation">
                <div>
                  <img
                    className="header-conversation-image"
                    src={avatar}
                    alt={friend.name}
                  />
                  <h3>{friend.name}</h3>
                </div>
                <p className="dashboard-unseen center-align">
                  {messages.length} New Messages
                </p>
                <p>Last Update : {moment(updatedAt).format("LLL")}</p>
              </div>
            </div>
          );
        });
      }
    } else {
      return (
        <div className="progress ">
          <div className="indeterminate" />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Dashboard />
        <div className="container">
          <h3 className="headings underline">Convarsations</h3>
          <div className="row">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userConversations: state.userConversations
  };
};
export default connect(
  mapStateToProps,
  actions
)(UserMessages);
