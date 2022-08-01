import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = (props) => {
  const { icon, positionPlacement } = props;

  return (
    <div className="btn-general" style={positionPlacement}>
      {icon}
    </div>
  );
};

Button.propTypes = {};

export default Button;
