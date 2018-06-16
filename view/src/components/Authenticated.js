import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Redirect } from "react-router-dom";
import Wait from "./Wait";

export const requiredLogin = ComposedComponent => {
  class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.renderContent = this.renderContent.bind(this);
    }
    renderContent() {
      const { user } = this.props;
      switch (user) {
        case null:
          return <Wait />;
        case false:
          return <Redirect to={"/"} />;
        default:
          return <ComposedComponent {...this.props} />;
      }
    }

    render() {
      return <div>{this.renderContent()}</div>;
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  return connect(
    mapStateToProps,
    actions
  )(Authenticated);
};
