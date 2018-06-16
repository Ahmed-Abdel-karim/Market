import React, { Component } from "react";
import Result from "./Result";
import SearchForm from "./SearchForm";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { queryStringToJSON } from "../utils/utils";

class Search extends Component {
  constructor(props) {
    super(props);
    this.renderResults = this.renderResults.bind(this);
    this.replaceHistory = this.replaceHistory.bind(this);
    this.removeFromFav = this.removeFromFav.bind(this);
    this.addToFav = this.addToFav.bind(this);
  }

  addToFav(_id) {
    this.props.addToFav(_id);
  }
  removeFromFav(_id) {
    this.props.removeFromFav(_id);
  }

  renderResults() {
    if (this.props.ads) {
      return (
        <ul className="container row">
          {this.props.ads.details.map(ad => {
            let fav = null;
            if (this.props.user) {
              if (this.props.user.favAds.includes(ad._id)) {
                fav = false;
              } else {
                fav = true;
              }
            }
            return (
              <li key={ad._id}>
                <Result
                  ad={ad}
                  removeFromFav={this.removeFromFav}
                  addToFav={this.addToFav}
                  fav={fav}
                />
              </li>
            );
          })}
        </ul>
      );
    }
  }

  replaceHistory(query) {
    this.props.history.replace(`?${query}`);
  }

  render() {
    return (
      <div>
        <section>
          <SearchForm
            initialValues={
              this.props.location.search
                ? queryStringToJSON(this.props.location.search)
                : { sortBy: "createdAt", order: "-1" }
            }
            count={this.props.ads ? this.props.ads.count : 0}
            replaceHistory={this.replaceHistory}
          />
        </section>
        <section>{this.renderResults()}</section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ads: state.searchAds,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(Search);
