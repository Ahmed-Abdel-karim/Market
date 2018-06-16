import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = () => {
  return (
    <a href="http://www.clker.com/cliparts/k/Q/V/D/z/u/map-marker-small-th.png">
      <img
        src="http://www.clker.com/cliparts/k/Q/V/D/z/u/map-marker-small-th.png"
        alt="Map-marker-small clip art"
        width="40px"
      />
    </a>
  );
};

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    };
  }
  componentDidMount() {
    this.setState({
      lat: Array.isArray(this.props.location)
        ? this.props.location[1]
        : this.props.location.coordinates[1],
      lng: Array.isArray(this.props.location)
        ? this.props.location[0]
        : this.props.location.coordinates[0]
    });
  }

  render() {
    return (
      <div style={{ height: "50vh", width: "250px", marginTop: "30px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCUHuBKSeFF2NOd9anQmMQzTEJmU1btP-Y" }}
          defaultCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          defaultZoom={15}
        >
          <AnyReactComponent
            lat={this.state.lat}
            lng={this.state.lng}
            text={"Kreyser Avrora"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
