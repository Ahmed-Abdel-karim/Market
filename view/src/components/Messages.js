import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { socketConnect } from "socket.io-react";
import moment from "moment";
import UserAvatar from "react-user-avatar";
import photo from "../img/profile.png";
import { Link } from "react-router-dom";
import * as actions from "../actions/index";
import profile from "../img/profile.png";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.state = {
      open: false,
      value: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.user) {
      const { socket, user } = nextProps;
      socket.on("message", data => {
        const newMessage = data.conv.messages[data.conv.messages.length - 1];
        if (newMessage.to === user._id) {
          const { _id } = data.conv;
          if (
            (this.props.conv === null && nextProps.conv === null) ||
            (nextProps === null && !!this.props.conv)
          ) {
            this.props.sendNotificatios(newMessage);
            this.props.fetchUserConversations();
          } else if (
            (!!nextProps.conv && this.props.conv === null) ||
            (!!nextProps.conv && !!this.props.conv)
          ) {
            if (nextProps.conv._id !== _id) {
              this.props.sendNotificatios(newMessage);
              this.props.fetchUserConversations();
            }
          }
        }
      });
      if (!!nextProps.notification && this.props.notification === null) {
        this.showMessage(nextProps.notification);
      } else if (!!nextProps.notification && !!this.props.notification) {
        if (nextProps.notification._id !== this.props.notification._id) {
          this.showMessage(nextProps.notification);
        }
      }
    }
  }

  componentDidUpdate(nextProps) {
    if (this.messagesEnd) {
      this.scrollToBottom();
    }
    if (!!this.props.user) {
      const { socket, user } = this.props;
      socket.on("message", data => {
        if (this.props.conv) {
          if (this.props.conv._id === data.conv._id) {
            this.props.fetchConversation(data.conv);
            const newMessage =
              data.conv.messages[data.conv.messages.length - 1];
            const { _id } = newMessage;
            if (newMessage.to === user._id) {
              socket.emit("update_message", { _id });
            }
          }
        }
      });
    }
    if (
      this.props.messageReceiver !== nextProps.messageReceiver &&
      !!this.props.messageReceiver
    ) {
      this.onOpenModal(this.props.messageReceiver);
    }
  }

  showMessage(message) {
    const { content, from } = message;
    const avatar = !!from.avatar ? `/api/img/${from.avatar}` : profile;
    return this.props.showMessage({
      title: `<p class="notificatio_sender">${from.name}</p>`,
      message: `<p class="notification_content">${content}</p>`,
      image: avatar,
      dismissible: true,
      dismissAfter: 3000,
      allowHTML: true
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { messageReceiver, user, conv } = this.props;
    const conv_id = conv._id;
    const content = this.state.value;
    const sender_id = user._id;
    const receiver_id = messageReceiver;
    if (!!content.trim()) {
      this.props.socket.emit("message", {
        sender_id,
        receiver_id,
        conv_id,
        content
      });
      this.setState({
        value: ""
      });
    }
  }
  renderMessages() {
    if (!!this.props.conv) {
      return this.props.conv.messages.map(message => {
        const src = message.from.avatar
          ? `/api/img/${message.from.avatar}`
          : photo;
        return (
          <div className="col s12 comment" key={message._id}>
            <Link
              to={`/user/${message.from._id}`}
              className="col s6 m2 l1 xl1 profile"
            >
              <UserAvatar size="48" name={message.from.name} src={src} />
              <span>{message.from.name}</span>
            </Link>
            <div className="col s12 m10 l11 xl11">
              <p className="comment-content">
                {message.content}
                <span className="right date">
                  {moment(message.createdAt).format("LLL")}
                </span>
              </p>
            </div>
          </div>
        );
      });
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  onOpenModal = receiver_id => {
    const { fetchConversation, user, socket } = this.props;
    const sender_id = user._id;
    this.setState({ open: true });
    socket.emit("messageList", {
      sender_id,
      receiver_id
    });
    socket.on("messageList", conv => {
      fetchConversation(conv);
    });
    this.props.fetchUserConversations();
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.props.resetConversation();
    this.props.sendMessage(null);
  };

  render() {
    return (
      <div>
        <section>
          <Modal
            open={this.state.open}
            onClose={this.onCloseModal}
            center
            closeOnEsc={false}
            closeOnOverlayClick={false}
          >
            <section className="message">
              <div className="message-board">
                {this.renderMessages()}
                <div
                  style={{ float: "left", clear: "both" }}
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                />
              </div>
              <form onSubmit={this.handleSubmit}>
                <textarea
                  rows="20"
                  cols="80"
                  name="message"
                  onChange={e => this.handleChange(e)}
                  placeholder="type your message ....."
                  value={this.state.value}
                />
                <button
                  className="btn-floating green darken-4 right"
                  type="submit"
                >
                  <i className="material-icons">send</i>
                </button>
              </form>
            </section>
          </Modal>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    conv: state.conversation,
    user: state.user,
    messageReceiver: state.messageReceiver,
    notification: state.sendNotification
  };
};

export default socketConnect(
  connect(
    mapStateToProps,
    actions
  )(Messages)
);
