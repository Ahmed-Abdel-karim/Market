import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";

class Wait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentWillReceiveProps(nextprops) {
    if (!!nextprops.wait) {
      this.setState({ open: true });
    } else if (!nextprops.wait) {
      this.setState({ open: false });
    }
  }
  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          closeOnEsc={false}
          closeOnOverlayClick={false}
          showCloseIcon={false}
          onClose={() => {}}
          center
        >
          <div>
            <h5 className="center-align">Please Wait...</h5>
            <div className="progress ">
              <div className="indeterminate" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { wait: state.wait };
};

export default connect(mapStateToProps)(Wait);
