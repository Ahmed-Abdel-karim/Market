import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import * as actions from "../actions/index";

class FlashMessage extends Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      open: true
    };
  }
  componentWillReceiveProps(nextprops) {
    if (
      !!this.props.flashMessage &&
      this.props.flashMessage !== nextprops.flashMessage
    ) {
      this.setState({ open: true });
    }
  }
  onCloseModal = () => {
    this.props.resetFlashMessage();
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        {this.props.flashMessage && (
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <p className="error">{this.props.flashMessage}</p>
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { flashMessage: state.flashMessage };
};

export default connect(
  mapStateToProps,
  actions
)(FlashMessage);
