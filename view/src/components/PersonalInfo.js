import React, { Component } from "react";
import { Link } from "react-router-dom";
import SimpleMap from "./Map";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    if (this.props.user !== null) {
      const user = this.props.user;
      const info = [
        { label: "name", icon: "assignment_ind" },
        { label: "gender", icon: "wc" },
        { label: "job", icon: "work" },
        { label: "country", icon: "home" },
        { label: "region", icon: "location_city" },
        { label: "phone_number", icon: "contact_phone" },
        { label: "email", icon: "contact_mail" }
      ];
      return (
        <div className="row container">
          <h3 className="underline">
            <span className="headings">Personal Info</span>
            <Link className="btn-floating" to="/editUser">
              <i className="material-icons">edit</i>
            </Link>
          </h3>
          <section className="col s12">
            {info.map(e => {
              return (
                <div key={e.label}>
                  <i className="small material-icons">{e.icon}</i>{" "}
                  <span className="informations">
                    {e.label} : {user[e.label] ? user[e.label] : "--------"}
                  </span>
                </div>
              );
            })}
            {user.location && <SimpleMap location={user.location} />}
          </section>
        </div>
      );
    }
    return (
      <div className="header">
        <div className="progress ">
          <div className="indeterminate" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Dashboard />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(PersonalInfo);
