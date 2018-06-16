import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Redirect } from "react-router-dom";
import Modal from "react-responsive-modal";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      open: false,
      password: "",
      confirmPassword: "",
      redirect: false
    };
  }

  handleChange(e) {
    if (e.target.placeholder === "enter password") {
      this.setState({ password: e.target.value });
    } else {
      this.setState({ confirmPassword: e.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { token } = this.props.match.params;
    const { password, confirmPassword } = this.state;
    if (!password) {
      this.props.sendFlashMessage("please enter a password");
    } else if (password !== confirmPassword) {
      this.props.sendFlashMessage(
        "Password does not match the confirm password"
      );
    } else {
      this.props.resetPassword({
        password,
        confirmPassword,
        token
      });
    }
  }
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    const { token } = this.props.match.params;
    if (!!token) {
      this.props.resetPasswordFormReq(token);
      console.log("Token sent");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reset_password === "ok") {
      this.setState({ open: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
    }
    return (
      <div>
        <div className="main" />
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <form onSubmit={this.handleSubmit}>
            <p>please enter a new password</p>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
              placeholder="enter password"
            />
            <input
              type="password"
              name="confirmPasword"
              value={this.state.confirmPassword}
              onChange={e => this.handleChange(e)}
              placeholder="confirm password"
            />
            <button className="btn green darken-2">send</button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reset_password: state.resetPassword
  };
};

export default connect(
  mapStateToProps,
  actions
)(ResetPassword);
