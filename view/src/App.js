import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./components/Header";
import UserMessages from "./components/UserMessages";
import Search from "./components/Search";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Ad from "./components/Ad";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-select/dist/react-select.css";
import "../src/css/style.css";
import CreateAdvertise from "./components/CreateAdvertise";
import UpdateAd from "./components/UpdateAd";
import EditUser from "./components/EditUser";
import PersonalInfo from "./components/PersonalInfo";
import UserAds from "./components/UserAds";
import UserFavAds from "./components/UserFavAds";
import profile from "./components/Profile";
import FlashMessage from "./components/FlashMessage";
import { requiredLogin } from "./components/Authenticated";
import Verification from "./components/Verification";
import VerificationError from "./components/VerificationError";
import RequestReset from "./components/RequestReset";
import Wait from "./components/Wait";
import ResetPassword from "./components/ResetPassword";
import NotificationsSystem from "reapop";
import theme from "reapop-theme-wybo";
import Messages from "./components/Messages";

const NotFound = () => {
  return (
    <div className="header">
      <h1 className="not-found">404 Page not found</h1>
      <Link className="btn grey darken-2 middle" to="/">
        Home
      </Link>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <NotificationsSystem theme={theme} />
          <Header />
          <Messages />
          <Wait />
          <VerificationError />
          <RequestReset />
          <Switch>
            <Route path="/" component={Landing} exact={true} />
            <Route
              path="/verification/:token"
              component={Verification}
              exact={true}
            />
            <Route
              path="/reset_password/:token"
              component={ResetPassword}
              exact={true}
            />
            <Route path="/search" component={Search} exact={true} />
            <Route
              path="/dashboard_personal_info"
              component={requiredLogin(PersonalInfo)}
            />
            <Route
              path="/dashboard_advertises"
              component={requiredLogin(UserAds)}
            />
            <Route
              path="/dashboard_fav_ads"
              component={requiredLogin(UserFavAds)}
            />
            <Route
              path="/dashboard_messages"
              component={requiredLogin(UserMessages)}
            />
            <Route
              path="/create_advertise"
              component={requiredLogin(CreateAdvertise)}
              exact={true}
            />
            <Route path="/advertise/:_id" component={Ad} exact={true} />
            <Route
              path="/update_advertise/:_id"
              component={requiredLogin(UpdateAd)}
              exact={true}
            />
            <Route path="/editUser" component={requiredLogin(EditUser)} />
            <Route path="/user/:_id" component={profile} />
            <Route component={NotFound} />
          </Switch>
          <FlashMessage />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
