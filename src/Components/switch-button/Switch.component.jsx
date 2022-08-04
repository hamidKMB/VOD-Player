import React from "react";
import PropTypes from "prop-types";
import "./switch.styles.scss";

const Switch = (props) => {
  const { checked, onChange } = props;
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider round"></span>
    </label>
  );
};

Switch.propTypes = { checked: PropTypes.bool, onChange: PropTypes.func };

export default Switch;
