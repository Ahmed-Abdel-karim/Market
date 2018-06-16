import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import * as actions from "../actions/index";
import { Redirect } from "react-router-dom";

class VerificationError extends Component {
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
    console.log(this.state.value);
    this.props.resendVarification(this.state.value);
    this.setState({
      value: ""
    });
    this.setState({
      redirect: true
    });
  }
  componentWillReceiveProps(nextprops) {
    if (!!nextprops.error) {
      this.setState({ open: true });
    }
  }
  onCloseModal = () => {
    this.props.resetVerificationError();
    this.setState({ open: false });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/`} />;
    }
    return (
      <div>
        {this.props.error && (
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <h5>{this.props.error}</h5>
            {this.props.error.message !==
              "his user has already been verified" && (
              <form onSubmit={this.handleSubmit}>
                <p>
                  to re-send verification message please enter your email and
                  press send
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
            )}
          </Modal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.verificationError };
};

export default connect(
  mapStateToProps,
  actions
)(VerificationError);
