import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";
import { formLables } from "../data/formLables";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Redirect } from "react-router-dom";

class AdForm extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.renderSubmit = this.renderSubmit.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.state = {
      button: true,
      redirect: false,
      country: ""
    };
  }

  componentDidMount() {
    if (this.props.create) {
      this.props.resetReducer();
    }
  }

  changeCountry(val) {
    this.setState({
      country: val
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.errors !== null) {
      this.setState({
        button: true
      });
    }
  }

  renderSubmit() {
    if (this.state.button) {
      return (
        <button type="submit" className="btn green darken-3 right hoverable">
          <i className="material-icons green darken-3 left">check</i>
          submit
        </button>
      );
    } else {
      return (
        <div className="preloader-wrapper small active right">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      );
    }
  }
  submitForm(values) {
    this.handleLocation(values.address)
      .then(res => {
        const AdForm = new FormData();
        values.location = [res.lat, res.lng];
        const terms = [
          "title",
          "price",
          "address",
          "location",
          "description",
          "category",
          "country",
          "region",
          "email",
          "phone_number",
          "brand"
        ];
        for (let i = 0; i < terms.length; i++) {
          if (!!values[terms[i]]) {
            AdForm.append(`${terms[i]}`, values[terms[i]]);
          }
        }
        AdForm.append("images", values.cover ? values.cover[0] : "", "cover");
        AdForm.append(
          "images",
          values.image_1 ? values.image_1[0] : "",
          "image_1"
        );
        AdForm.append(
          "images",
          values.image_2 ? values.image_2[0] : "",
          "image_2"
        );
        if (values.tags) {
          values.tags.forEach(tag => {
            AdForm.append("tags", tag.value);
          });
        }
        if (this.props.create) {
          this.props.createAd(AdForm);
        } else {
          this.props.updateAd(AdForm, this.props._id);
        }

        this.setState({
          button: false,
          redirect: true
        });
      })
      .catch(e => {
        this.props.sendFlashMessage("Please enter a valid location");
      });
  }

  handleLocation(address) {
    return geocodeByAddress(address).then(results => getLatLng(results[0]));
  }

  renderContent() {
    let country =
      this.state.country === "" && !!this.props.initialValues
        ? this.props.initialValues.country
        : this.state.country;
    return formLables.map(e => {
      return (
        <Field
          name={e.name}
          label={e.label}
          component={FormField}
          key={e.name}
          type={e.type}
          options={e.options}
          changeCountry={val => this.changeCountry(val)}
          country={country}
          className={e.className}
          icon={e.icon}
        />
      );
    });
  }

  render() {
    if (!!this.props.createOrUpdateAd) {
      const { _id } = this.props.createOrUpdateAd;
      if (this.state.redirect) {
        return <Redirect to={`/ad/${_id}`} />;
      }
    }
    return (
      <div className="header">
        <form
          onSubmit={this.props.handleSubmit(values => this.submitForm(values))}
          className="container row form"
        >
          <h1 className="center-align">
            {this.props.create ? "Create Ad" : "Update Ad"}
          </h1>
          {this.renderContent()}
          {this.renderSubmit()}
        </form>
      </div>
    );
  }
}

const validate = values => {
  let errors = {};
  const fields = [
    "title",
    "price",
    "category",
    "description",
    "phone_number",
    "address"
  ];
  fields.forEach(e => {
    if (!values[e]) {
      errors[e] = `you must provide ${e}`;
    }
  });
  if (values.title) {
    if (values.title.length < 5) {
      errors.title = "must be more than 5 characters";
    }
  }
  if (values.description) {
    if (values.description.length < 15) {
      errors.description = "must be more than 15 characters";
    }
  }
  return errors;
};

AdForm = reduxForm({
  form: "Ad",
  validate: validate
})(AdForm);

const mapSatetToProbs = state => {
  return {
    createOrUpdateAd: state.createOrUpdateAd,
    errors: state.flashMessage
  };
};

AdForm = connect(
  mapSatetToProbs,
  actions
)(AdForm);

export default AdForm;
