import React, { Component } from "react";
import { renderFormLabels } from "../utils/utils";
import { reduxForm } from "redux-form";
import { loginLabels, registerLabels } from "../data/formLables";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderFormLabels.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormLabels() {
    if (!!this.props.register) {
      return renderFormLabels(registerLabels);
    }
    return renderFormLabels(loginLabels);
  }

  submitForm(values) {
    const { registerUser, login } = this.props;
    if (this.props.register) {
      registerUser(values);
    } else {
      login(values);
    }
  }
  render() {
    const { register } = this.props;
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.submitForm(values))}
      >
        <h5 className="center-align">{register ? "REGISTER" : "LOGIN"}</h5>
        {this.renderFormLabels()}
        <button type="submit" className="btn green darken-1">
          submit
        </button>
        <a
          className="center-align login_toggle"
          onClick={this.props.handleToggle}
        >
          {this.props.register
            ? "already have an account"
            : "create new account"}
        </a>
        {!this.props.register && (
          <a
            className="center-align login_toggle"
            onClick={() => this.props.openRequestPassword("open")}
          >
            forgot your password ?
          </a>
        )}
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);
export default LoginForm;
