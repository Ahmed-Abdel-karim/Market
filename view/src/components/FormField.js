import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Dropzone from "react-dropzone";
import Select from "react-select";
import { Creatable } from "react-select";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [null],
      selectedOption: "",
      categories: [],
      country: "",
      region: ""
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handletype = this.handletype.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
  }
  selectCountry(val) {
    this.setState({ country: val });
    this.props.changeCountry(val);
    this.props.input.onChange(val);
  }

  selectRegion(val) {
    this.setState({ region: val });
    this.props.input.onChange(val);
  }

  handleDrop(image) {
    this.setState({
      image
    });
    this.props.input.onChange(image);
  }

  handleEnterKey(e) {
    if (e.target.placeholder !== "search") {
      if (e.which === 13 || e.keyCode === 13) {
        return e.preventDefault();
      }
    }
  }

  handletype(type) {
    switch (type) {
      case "tags":
        return (
          <div className={this.props.className}>
            <label>{this.props.label}</label>
            <Creatable
              name={this.props.name}
              multi={true}
              value={this.props.input.value}
              onChange={this.props.input.onChange}
              clearable={false}
            />
            <p className="warning">
              {this.props.meta.touched && this.props.meta.error}
            </p>
          </div>
        );
      case "select":
        return (
          <div className={this.props.className}>
            <label>{this.props.label}</label>
            <Select
              name={this.props.name}
              options={this.props.options}
              value={this.props.input.value}
              onChange={this.props.input.onChange}
              onBlur={() => this.props.input.onBlur(this.props.input.value)}
              clearable={false}
              simpleValue
              searchable={false}
            />
            <p className="warning">
              {this.props.meta.touched && this.props.meta.error}
            </p>
          </div>
        );
      case "textarea":
        return (
          <div className={this.props.className}>
            <i className="material-icons prefix">{this.props.icon}</i>
            <textarea
              rows="20"
              cols="80"
              {...this.props.input}
              name={this.props.name}
              placeholder="Enter your Advertise Details"
              className="description_textarea"
            />
            <p className="warning">
              {this.props.meta.touched && this.props.meta.error}
            </p>
          </div>
        );
      case "file":
        return (
          <div className={this.props.className}>
            <div className="row">
              <Dropzone
                accept="image/*"
                name={this.props.name}
                {...this.props.input}
                onDrop={images => {
                  this.handleDrop(images);
                }}
                multiple={false}
                className="col sm2"
              >
                <p className="btn btn-small grey darken-4">
                  <i className="material-icons">{this.props.icon}</i>
                  {this.props.label}
                </p>
              </Dropzone>
              <aside className="col sm8">
                {this.state.image[0] !== null && (
                  <img
                    src={this.state.image[0].preview}
                    alt="cover"
                    width="120px"
                  />
                )}
              </aside>
            </div>
            <p className="warning">
              {this.props.meta.touched && this.props.meta.error}
            </p>
          </div>
        );
      case "address":
        return (
          <div className={this.props.className}>
            <i className="material-icons">{this.props.icon}</i>
            <PlacesAutocomplete
              inputProps={{ ...this.props.input }}
              name={this.props.name}
              class="col s12"
            />
            <p className="warning">
              {this.props.meta.touched && this.props.meta.error}
            </p>
          </div>
        );
      case "country":
        return (
          <div className={this.props.className}>
            <label>{this.props.label}</label>
            <CountryDropdown
              {...this.props.input}
              value={this.props.input.value}
              onChange={val => this.selectCountry(val)}
            />
            <p className="warning">
              {this.props.meta.touched && this.props.meta.error}
            </p>
          </div>
        );
      case "region":
        return (
          <div className={this.props.className}>
            <label>{this.props.label}</label>
            <RegionDropdown
              {...this.props.input}
              country={this.props.country}
              value={this.props.input.value}
              onChange={val => this.selectRegion(val)}
            />
          </div>
        );
      default:
        return (
          <div className={this.props.className}>
            <i className="material-icons prefix">{this.props.icon}</i>
            <input
              {...this.props.input}
              type={this.props.type}
              onKeyPress={e => this.handleEnterKey(e)}
              name={this.props.name}
              placeholder={this.props.label}
              className={this.props.inputClassName}
            />
            <div className="warning">
              <span>{this.props.meta.touched && this.props.meta.error}</span>
            </div>
          </div>
        );
    }
  }
  render() {
    return this.handletype(this.props.type);
  }
}

export default FormField;
