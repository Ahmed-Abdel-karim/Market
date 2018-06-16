import React, { Component } from "react";
import AdForm from "./AdForm";

class CreateAdvertise extends Component {
  render() {
    return (
      <div>
        <AdForm create={true} adForm={"Create Advertise"} />
      </div>
    );
  }
}

export default CreateAdvertise;
