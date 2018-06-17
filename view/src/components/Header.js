import { Link } from "react-router-dom";
import React, { Component } from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import profile from "../img/profile.png";
import message_icon from "../img/message.png";
import { stack as Menu } from "react-burger-menu";
import Icon from "react-icons-kit";
import { home2 } from "react-icons-kit/icomoon";
import { logout } from "react-icons-kit/iconic/logout";
import { dashboard } from "react-icons-kit/iconic/dashboard";
import login from "../img/loginandregister.png";
import UserAvatar from "react-user-avatar";
import Modal from "react-responsive-modal";
import LoginForm from "./LoginForm";
import { setAuthToken } from "../utils/utils";

class Header extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      open: false,
      register: false
    };
  }

  componentDidMount() {
    if (!!localStorage.token && localStorage.token !== "undefined") {
      setAuthToken(localStorage.token);
      this.props.fetchUser();
      this.props.fetchUnseenMessages();
    } else {
      this.props.resetUser();
    }
  }
  shouldComponentUpdate(nextPorps) {
    if (this.props.user) {
      if (this.props.user._id === nextPorps.user._id) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  componentWillReceiveProps(nextPorps) {
    if (!!nextPorps.unseen && !this.props.unseen) {
      const { messages } = nextPorps.unseen;
      let title, message;
      if (messages > 0) {
        if (messages === 1) {
          title = "you have one new message";
          message = `<p>to see it go to the Messages section in the dashboard</p>`;
        } else {
          title = `you have ${messages} new messages`;
          message = `<p>to see them go to the Messages section in the dashboard</p>`;
        }
        this.props.showMessage({
          title,
          message,
          image: message_icon,
          dismissible: true,
          position: "t",
          dismissAfter: 300000,
          allowHTML: true
        });
      }
    }
  }
  onCloseModal() {
    this.setState({ open: false });
  }
  onOpenModal() {
    this.setState({ open: true });
  }

  handleToggle() {
    this.setState(prevState => {
      return {
        register: !prevState.register
      };
    });
  }

  renderContent() {
    switch (this.props.user) {
      case false:
        return (
          <a onClick={this.onOpenModal} id="header-login">
            <img alt="login with google" src={login} width="100%" />
          </a>
        );
      case null:
        return (
          <Spinner
            name="line-scale-party"
            color="#212121"
            className="center-align"
          />
        );
      default:
        const { user } = this.props;
        const avatar = !!user.avatar ? `/api/img/${user.avatar}` : profile;
        return (
          <article>
            <aside id="header-user" className="z-depth-5">
              <UserAvatar
                size="48"
                name={avatar}
                src={avatar}
                id="header-profile"
              />
              <p className="header-name">
                {this.props.user.name.split(" ", 1)}
              </p>
            </aside>
            <a
              className="header-menu-item"
              id="header-logout"
              onClick={this.props.logoutUser}
            >
              <Icon size={15} icon={logout} />
              <span className="header-label">Logout</span>
            </a>
            <Link className="header-menu-item" to="/dashboard_personal_info">
              <Icon size={20} icon={dashboard} />
              <span className="header-label">Dashboard</span>
            </Link>
          </article>
        );
    }
  }
  render() {
    return (
      <div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <LoginForm
            register={this.state.register}
            handleToggle={this.handleToggle}
            registerUser={this.props.registerUser}
            login={this.props.login}
            openRequestPassword={this.props.openRequestPassword}
            closeRequestPassword={this.props.closeRequestPassword}
          />
        </Modal>
        <nav className="navbar-fixed grey darken-4" />
        <Menu menuClassName="my-menu z-depth-5">
          <h3 id="header-logo">Market</h3>
          {this.renderContent()}
          <Link className="header-menu-item" to="/">
            <Icon size={20} icon={home2} />
            <span className="header-label">Home</span>
          </Link>
        </Menu>
      </div>
    );
  }
}
const mapStateToProbs = state => {
  return {
    user: state.user,
    unseen: state.unseen
  };
};
export default connect(
  mapStateToProbs,
  actions
)(Header);
