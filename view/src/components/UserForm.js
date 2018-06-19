import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.renderSubmit = this.renderSubmit.bind(this);
    this.state = {
      country: "",
      button: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.errors !== null) {
      this.setState({
        button: true,
        redirect: false
      });
    }
  }

  changeCountry(val) {
    this.setState({
      country: val
    });
  }
  submitForm(values) {
    this.handleLocation(values.address)
      .then(res => {
        const userForm = new FormData();
        const location = [res.lat, res.lng];
        values.location = location;
        const terms = [
          "name",
          "job",
          "address",
          "location",
          "gender",
          "country",
          "region",
          "phone_number"
        ];
        for (let i = 0; i < terms.length; i++) {
          if (!!values[terms[i]]) {
            userForm.append(`${terms[i]}`, values[terms[i]]);
          }
        }
        userForm.append(
          "avatar",
          values.avatar ? values.avatar[0] : "",
          "avatar"
        );
        this.setState({
          button: false
        });
        this.props.updateUser(userForm);
      })
      .catch(e => {
        this.props.sendFlashMessage("please enter a valid location");
      });
  }
  handleLocation(address) {
    return geocodeByAddress(address).then(results => getLatLng(results[0]));
  }
  renderSubmit() {
    if (this.state.button) {
      return (
        <button type="submit" className="btn green darken-2 right">
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
  renderContent() {
    let country =
      this.state.country === "" && !!this.props.initialValues
        ? this.props.initialValues.country
        : this.state.country;
    const formLables = [
      {
        name: "name",
        label: "Name",
        type: "text",
        icon: "assignment_ind"
      },
      { name: "avatar", label: "avatar", type: "file" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
          {
            label: "Male",
            value: "male"
          },
          {
            label: "Female",
            value: "female"
          }
        ]
      },
      {
        name: "job",
        label: "job",
        type: "text",
        icon: "work"
      },
      {
        name: "country",
        label: "country",
        type: "country"
      },
      {
        name: "region",
        label: "region",
        type: "region"
      },
      {
        name: "phone_number",
        label: "phone number",
        type: "number",
        icon: "contact_phone"
      },
      {
        name: "address",
        label: "address",
        type: "address",
        icon: "location_on"
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
          country={country}
          icon={e.icon}
        />
      );
    });
  }

  render() {
    return (
      <div className="row header">
        <form
          onSubmit={this.props.handleSubmit(values => this.submitForm(values))}
          className="form container"
        >
          <h1 className="center-align">Personal info</h1>
          {this.renderContent()}
          {this.renderSubmit()}
          <div className="clear-fix" />
        </form>
      </div>
    );
  }
}

const mapSatetToProbs = state => {
  return {
    errors: state.flashMessage
  };
};

UserForm = reduxForm({
  form: "user"
})(UserForm);

export default connect(
  mapSatetToProbs,
  actions
)(UserForm);
