import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { socketConnect } from "socket.io-react";
import * as actions from "../actions/index";

class AddComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.socket.emit("comment", {
      comment: this.state.value,
      ad_id: this.props.ad_id,
      user_id: this.props.user_id
    });
    this.props.socket.on("comment", data => {
      if (data.ad_id === this.props.ad_id) {
        this.props.fetchComments(data.comments);
      }
    });
    this.setState({
      value: ""
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="comment"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
          style={{ background: "white", paddingLeft: "5px" }}
          placeholder="Add your commnet"
        />
      </form>
    );
  }
}

export default socketConnect(
  connect(
    null,
    actions
  )(AddComment)
);
