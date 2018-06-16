import React, { PureComponent } from "react";

class Footer extends PureComponent {
  renderContent = () => {
    const info = [
      {
        term: "Developed by : Ahmed Abdelkarim",
        icon: "person"
      },
      {
        term: "Phone Number : 00201005114812",
        icon: "local_phone"
      },
      {
        term: "Email : ahmad.abdelkarim89@gmail.com",
        icon: "email"
      },
      {
        term: "Address : Suez,Egypt",
        icon: "location_on"
      }
    ];
    return info.map(e => {
      return (
        <li key={e.icon}>
          <p className="grey-text text-lighten-3">
            <i className="material-icons">{e.icon}</i>
            <span className="informations">{e.term}</span>
          </p>
        </li>
      );
    });
  };
  render() {
    return (
      <footer className="page-footer grey darken-3 ">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">About</h5>
              <p className="grey-text text-lighten-4">
                Mraket is a free fictitious platform for buying and selling
                services and goods such as electronics, furniture, household
                goods, cars and bikes. you can post, edit, delete and search for
                any product you want also you can make a comment or send a
                message to the advertiser.
              </p>
            </div>
            <div className="col l5 offset-l1 s12">
              <h5 className="white-text">contacts</h5>
              <ul>{this.renderContent()}</ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">© 2018 Copyright Text</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
