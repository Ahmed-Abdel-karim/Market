import React, { Component } from "react";
import UserForm from "./UserForm";
import { connect } from "react-redux";

class EditUser extends Component {
  render() {
    return (
      <div>
        <UserForm initialValues={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(EditUser);
