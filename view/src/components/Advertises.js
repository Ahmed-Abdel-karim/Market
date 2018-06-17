import React, { Component } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Pagination from "react-js-pagination";

class UserAds extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      activePage: 1
    };
  }
  componentWillMount() {
    if (this.props.title === "Advertises") {
      this.props.fetchUserAds((this.state.activePage - 1) * 12);
    } else if (this.props.title === "Favorite Ads") {
      this.props.fetchFavAds((this.state.activePage - 1) * 12);
    }
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.title === "Advertises") {
      if (nextProps.ads) {
        if (nextProps.ads.delete === true) {
          this.props.fetchUserAds((this.state.activePage - 1) * 12);
        }
      }
    } else if (this.props.title === "Favorite Ads") {
      if (nextProps.user !== this.props.user) {
        this.props.fetchFavAds((this.state.activePage - 1) * 12);
      }
    }
  }

  handlePageChange(pageNumber) {
    if (pageNumber !== this.state.activePage) {
      if (this.props.title === "Advertises") {
        this.props.fetchUserAds((pageNumber - 1) * 12);
      } else {
        this.props.fetchFavAds((this.state.activePage - 1) * 12);
      }

      this.setState({ activePage: pageNumber });
    }
  }

  renderContent() {
    if (this.props.user === null || this.props.ads === null) {
      return (
        <div className="progress ">
          <div className="indeterminate" />
        </div>
      );
    } else if (this.props.ads === false) {
      return <h3 className="center-align">No Ads Found</h3>;
    } else {
      return (
        <div>
          <p className="clearfix">{this.props.ads.count} Ads found</p>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={12}
            totalItemsCount={this.props.ads.count}
            pageRangeDisplayed={10}
            onChange={number => this.handlePageChange(number)}
          />
          {this.props.ads.details ? (
            this.props.ads.details.map(ad => {
              return (
                <Card
                  cover={ad.gallery[0]}
                  title={ad.title}
                  createdAt={ad.createdAt}
                  key={ad._id}
                  _id={ad._id}
                  fav={this.props.title === "Advertises" ? null : false}
                  user={this.props.title === "Advertises" ? true : false}
                  price={ad.price}
                  category={ad.category}
                  deleteAd={this.props.deleteAd}
                  removeFromFav={this.props.removeFromFav}
                />
              );
            })
          ) : (
            <div className="progress ">
              <div className="indeterminate" />
            </div>
          )}
        </div>
      );
    }
  }

  render() {
    const { title } = this.props;
    return (
      <div className="row container">
        <h3 className="underline">
          <span className="headings">{title}</span>
          {title === "Advertises" && (
            <Link className="btn-floating red hoverable" to="/create_advertise">
              <i className="material-icons">add</i>
            </Link>
          )}
        </h3>
        <section className="col s12">{this.renderContent()}</section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    ads: state.searchAds
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserAds);
