import React from "react";
import "./NotefulForm.css";
import NotefulError from "../NotefulError/NotefulError";
import PropTypes from "prop-types";

export default function NotefulForm(props) {
  const { className, ...otherProps } = props;
  return (
    <NotefulError>
      <form
        className={["Noteful-form", className].join(" ")}
        action="#"
        {...otherProps}
      />
    </NotefulError>
  );
}

NotefulForm.propTypes = {
  className: PropTypes.string,
};
