import FormField from "../components/FormField";
import { Field } from "redux-form";
import React from "react";
import axios from "axios";

export const renderFormLabels = formLables => {
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
        icon={e.icon}
      />
    );
  });
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const queryStringToJSON = queryString => {
  let qs = queryString.slice(1) || this.props.location.search.slice(1);
  let pairs = qs.split("&");
  let result = {};
  pairs.forEach(function(p) {
    let pair = p.split("=");
    let key = pair[0];
    let value = decodeURIComponent(pair[1] || "");

    if (result[key]) {
      if (Object.prototype.toString.call(result[key]) === "[object Array]") {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });

  return JSON.parse(JSON.stringify(result));
};

export const serialize = obj => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
