import React, { Component } from "react";
import AdForm from "./AdForm";
import * as actions from "../actions/index";
import { connect } from "react-redux";
class UpdateAd extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }
  componentDidMount() {
    const _id = this.props.match.params._id;
    this.props.fetchAds(null, _id);
  }
  componentWillUnmount() {
    this.props.resetReducer();
  }
  renderContent() {
    switch (this.props.ad) {
      case null:
        return (
          <div className="progress ">
            <div className="indeterminate" />
          </div>
        );
      case false:
        return (
          <p className="header">
            Error Advertise is either deleted or not found
          </p>
        );
      default:
        if (this.props.ad.title === undefined) {
          return (
            <div className="progress ">
              <div className="indeterminate" />
            </div>
          );
        } else if (this.props.ad.user._id !== this.props.user._id) {
          return <p className="header">Unauthorized</p>;
        } else {
          return (
            <AdForm
              initialValues={this.props.ad}
              create={false}
              _id={this.props.match.params._id}
            />
          );
        }
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ad: state.ads,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(UpdateAd);
