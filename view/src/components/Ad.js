import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import ImageGallery from "react-image-gallery";
import Comment from "./Comment";
import SimpleMap from "./Map";
import AddComment from "./AddComment";
import { socketConnect } from "socket.io-react";
import { Link } from "react-router-dom";
import moment from "moment";
import photo from "../img/noimagefound.jpg";
class Ad extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.renderGallery = this.renderGallery.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addToFav = this.addToFav.bind(this);
    this.removeFromFav = this.removeFromFav.bind(this);
    this.renderFavorite = this.renderFavorite.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.state = {
      favorite: null
    };
  }

  componentWillMount() {
    const _id = this.props.match.params._id;
    this.props.fetchAds(null, _id);
    this.props.socket.emit("commentList", _id);
    this.props.socket.on("commentList", comments =>
      this.props.fetchComments(comments)
    );
  }

  componentWillReceiveProps(nextProps) {
    const _id = this.props.match.params._id;
    if (nextProps.user) {
      const favAds = nextProps.user.favAds;
      if (favAds.includes(_id)) {
        this.setState({
          favorite: false
        });
      } else {
        this.setState({
          favorite: true
        });
      }
    }
  }

  renderComments() {
    return this.props.comments.map(comment => {
      return (
        <li key={comment._id}>
          <Comment comment={comment} />
        </li>
      );
    });
  }

  addToFav() {
    this.props.addToFav(this.props.match.params._id);
    this.setState({
      favorite: false
    });
  }
  removeFromFav() {
    this.props.removeFromFav(this.props.match.params._id);
    this.setState({
      favorite: true
    });
  }

  renderFavorite() {
    switch (this.state.favorite) {
      case null:
        return <div />;
      case true:
        return (
          <button
            className="btn-floating grey darken-1 hoverable"
            onClick={this.addToFav}
          >
            <i className="material-icons">star</i>
          </button>
        );
      default:
        return (
          <button
            className="btn-floating grey darken-4"
            onClick={this.removeFromFav}
          >
            <i className="material-icons">remove</i>
          </button>
        );
    }
  }

  renderGallery() {
    const { gallery } = this.props.ad;
    if (gallery.length > 0) {
      const images = gallery.map(image => {
        return {
          original: `/api/img/${image}`
        };
      });
      return (
        <ImageGallery
          items={images}
          showBullets={false}
          showPlayButton={false}
          showThumbnails={false}
          showFullscreenButton={false}
        />
      );
    } else {
      return <img src={photo} alt="no gallery provided" />;
    }
  }

  handleDelete() {
    this.props.deleteAd(this.props.ad._id);
  }

  renderContent() {
    switch (this.props.ad) {
      case null:
        return (
          <div className="header">
            <div className="progress">
              <div className="indeterminate" />
            </div>
          </div>
        );
      case false:
        return <p>Error Advertise is either deleted or not found</p>;
      default:
        if (this.props.ad.title === undefined) {
          return (
            <div className="header">
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </div>
          );
        } else {
          const {
            title,
            description,
            category,
            brand,
            price,
            email,
            phone_number,
            user,
            createdAt,
            address,
            location,
            country,
            region
          } = this.props.ad;
          return (
            <article className="row header container">
              <h1 className="underline center-align">{title}</h1>
              <section className="col s12 m6 ">{this.renderGallery()}</section>
              <section className="col s12 m6 ">
                <ul>
                  <li>
                    <p className="price">Price : {price} $</p>
                  </li>
                  <li>
                    <p>Brand : {brand}</p>
                  </li>
                  <li>
                    <p>Category : {category}</p>
                  </li>
                  <li>
                    <p>Last Update : {moment(createdAt).format("LLL")}</p>
                  </li>
                  <li>
                    <Link to={`/user/${user._id}`}>
                      Posted By : {user.name}
                    </Link>
                  </li>
                </ul>
                {this.renderFavorite()}
              </section>
              <section className="col s12">
                <h2 className="underline center-align">Description</h2>
                <p>{description}</p>
              </section>
              <section className="col s12 m6">
                <h2 className="underline center-align">Contacts</h2>
                <p>Phone number : {phone_number}</p>
                <p>Email : {email}</p>
                <p>Country: {country}</p>
                <p>Region: {region}</p>
                <p>Address : {address}</p>
              </section>
              <section className="col s12 m6 ">
                <SimpleMap location={location} />
              </section>
              <aside className="col s12 comments">
                <h2 className="underline center-align">Comments</h2>
                {this.props.comments && <ul>{this.renderComments()}</ul>}
                {this.props.user && (
                  <section>
                    <h3>Add comment</h3>
                    <AddComment
                      ad_id={this.props.ad._id}
                      user_id={this.props.user._id}
                    />
                  </section>
                )}
              </aside>
            </article>
          );
        }
    }
  }

  render() {
    return <div className="ad-background">{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ad: state.ads,
    user: state.user,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  actions
)(socketConnect(Ad));
