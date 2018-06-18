import React, { Component } from "react";
import FormField from "./FormField";
import { reduxForm, Field } from "redux-form";
import category from "../data/categoryList";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import Pagination from "react-js-pagination";
import { serialize } from "../utils/utils";
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.renderAdvanced = this.renderAdvanced.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      country: "",
      advanced: false,
      redirect: false,
      activePage: 1
    };
  }

  componentWillMount() {
    this.props.initialValues["skip"] = (this.state.activePage - 1) * 12;
    this.props.searchAds(this.props.initialValues);
  }

  handlePageChange(pageNumber) {
    if (pageNumber !== this.state.activePage) {
      this.props.initialValues.skip = (pageNumber - 1) * 12;
      this.submitForm(this.props.initialValues);
      this.setState({ activePage: pageNumber });
    }
  }

  changeCountry(val) {
    this.setState({
      country: val
    });
  }

  renderAdvanced() {
    const formLables = [
      {
        name: "category",
        label: "Category",
        type: "select",
        options: category,
        className: "col s12"
      },
      {
        name: "priceFrom",
        label: "$(from)",
        type: "number",
        className: "col s12 m6"
      },
      {
        name: "priceTo",
        label: "$(to)",
        type: "number",
        className: "col s12 m6"
      },
      {
        name: "sortBy",
        label: "sort by",
        type: "select",
        className: "col s12 m6",
        options: [
          {
            label: "relevance",
            value: "relevance"
          },
          {
            label: "price",
            value: "price"
          },
          {
            label: "date",
            value: "createdAt"
          }
        ]
      },
      {
        name: "order",
        label: "order",
        type: "select",
        className: "col s12 m6",
        options: [{ value: "1", label: "Asc" }, { value: "-1", label: "Desc" }]
      },
      {
        name: "country",
        label: "country",
        type: "country",
        className: "col s12 m6"
      },
      {
        name: "region",
        label: "region",
        type: "region",
        className: "col s12 m6"
      }
    ];
    return formLables.map(e => {
      return (
        <Field
          name={e.name}
          label={e.label}
          component={FormField}
          key={e.label}
          type={e.type}
          options={e.options}
          fields={e.fields}
          changeCountry={val => this.changeCountry(val)}
          country={this.state.country}
          className={e.className}
          icon={e.icon}
          inputClassName={e.inputClassName}
        />
      );
    });
  }

  sendRequest(values) {
    this.props.searchAds(values);
  }

  submitForm(values) {
    this.sendRequest(values);
    const query = serialize(values);
    this.props.replaceHistory(query);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.submitForm(values))}
        className="header container row"
      >
        <Field
          name="term"
          label="search"
          component={FormField}
          key="search"
          type="text"
          className="col s10 m11 l10 xl10"
          inputClassName="search-term"
        />
        <button
          type="submit"
          className="btn btn-small col s2 m1 green darken-2"
        >
          <i className="material-icons right">search</i>
        </button>
        <a
          className="search-advanced col s12"
          onClick={() => {
            if (this.state.advanced) {
              this.setState({
                advanced: false
              });
            } else {
              this.setState({
                advanced: true
              });
            }
          }}
        >
          advanced search
        </a>
        <div id="search-advanced" className="col s12 row">
          {this.state.advanced && this.renderAdvanced()}
          {this.state.advanced && (
            <button className="col s12 btn submit" type="submit">
              Submit
            </button>
          )}
        </div>
        <p className="clearfix">{this.props.count} results found</p>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={12}
          totalItemsCount={this.props.count}
          pageRangeDisplayed={10}
          onChange={number => this.handlePageChange(number)}
        />
      </form>
    );
  }
}

SearchForm = reduxForm({
  form: "search"
})(SearchForm);

export default connect(
  null,
  actions
)(SearchForm);
