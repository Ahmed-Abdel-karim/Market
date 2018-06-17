import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { connect } from "react-redux";
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/fa/search";
import { plus } from "react-icons-kit/icomoon/plus";
import * as actions from "../actions/index";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.state = {
      favAds: null
    };
  }

  componentWillMount() {
    const values = {
      sortBy: "createdAt",
      order: "-1"
    };
    this.props.fetchAds(values);
  }

  renderLogin() {
    if (!!this.props.user) {
      return (
        <Link to="/create_advertise" className="btn landing-btn">
          <Icon size={13} icon={plus} className="landing-btn-icon" />
          Place Ad
        </Link>
      );
    } else {
      return <div />;
    }
  }

  renderContent() {
    if (this.props.ads === null || !Array.isArray(this.props.ads.details)) {
      return (
        <div className="progress ">
          <div className="indeterminate" />
        </div>
      );
    } else if (this.props.ads.details.lenght === 0) {
      return <h3 className="center-align">No Ads Found</h3>;
    } else {
      return (
        <ul>
          {this.props.ads.details.map(ad => {
            if (this.props.user) {
              const favAds = this.props.user.favAds.map(e => {
                return e.toString();
              });
              return (
                <li key={ad._id}>
                  <Card
                    cover={ad.gallery[0]}
                    title={ad.title}
                    createdAt={ad.createdAt}
                    _id={ad._id}
                    fav={!favAds.includes(ad._id.toString())}
                    price={ad.price}
                    category={ad.category}
                  />
                </li>
              );
            } else {
              return (
                <li key={ad._id}>
                  <Card
                    cover={ad.gallery[0]}
                    title={ad.title}
                    createdAt={ad.createdAt}
                    _id={ad._id}
                    addToFav={this.addToFav}
                    fav={null}
                    price={ad.price}
                    category={ad.category}
                  />
                </li>
              );
            }
          })}
        </ul>
      );
    }
  }
  render() {
    return (
      <article className="main">
        <section className="center-align landing-background white-text">
          <header className="landing-header">
            <h1>MARKET</h1>
            <h3>Buy And Sell For Free</h3>
            <section>
              <Link
                className="btn red landing-btn"
                to="/search?sortBy=createdAt&order=-1"
              >
                <Icon size={14} icon={search} className="landing-btn-icon " />
                Search
              </Link>
              {this.renderLogin()}
            </section>
          </header>
        </section>
        <h2 className="headings">Latest Ads</h2>
        <article className="row container">{this.renderContent()}</article>
      </article>
    );
  }
}

const mapStateToProbs = state => {
  return { ads: state.ads, user: state.user };
};

export default connect(
  mapStateToProbs,
  actions
)(Landing);
