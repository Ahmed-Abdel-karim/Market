import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Redirect } from "react-router-dom";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: true
    };
  }

  componentWillMount() {
    const { token } = this.props.match.params;
    if (!!token) {
      this.props.verifyUser(token);
    }
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
    }
    return (
      <div className="header container content">
        <h3> verifying your account Please Wait ....</h3>
        <div className="progress ">
          <div className="indeterminate" />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Verification);
