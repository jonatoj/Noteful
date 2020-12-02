import React, { Component } from "react";
import PropTypes from "prop-types";

class NotefulError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log("error function");
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops! Could not display this right now.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default NotefulError;

NotefulError.propTypes = {
  children: PropTypes.object,
};
