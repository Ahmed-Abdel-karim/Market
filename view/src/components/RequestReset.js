import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import * as actions from "../actions/index";
import { Redirect } from "react-router-dom";

class RequestReset extends Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      open: false,
      value: "",
      redirect: false
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.RequestPassword(this.state.value);
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.reset_password === "open") {
      console.log("sayed");
      this.setState({ open: true });
    }
  }
  onCloseModal = () => {
    this.setState({ open: false });
    this.props.openRequestPassword(null);
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
    }
    return (
      <div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <form onSubmit={this.handleSubmit}>
            <p>
              to send a reset password link please enter your email and press
              send
            </p>
            <input
              type="email"
              name="email"
              value={this.state.value}
              onChange={e => this.handleChange(e)}
              placeholder="enter your email"
            />
            <button className="btn green darken-2">send</button>
          </form>
        </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { reset_password: state.resetPassword };
};

export default connect(
  mapStateToProps,
  actions
)(RequestReset);
