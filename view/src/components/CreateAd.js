import React, { Component } from "react";
import AdForm from "./AdForm";

class CreateAd extends Component {
  render() {
    return (
      <div>
        <AdForm create={true} adForm={"Create Ad"} />
      </div>
    );
  }
}

export default CreateAd;
