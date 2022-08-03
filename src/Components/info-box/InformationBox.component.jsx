import React from "react";
import PropTypes from "prop-types";
import "./information-box.styles.scss";

const InformationBox = (props) => {
  const { boxTitle, selectedValue } = props;
  return (
    <div className="info-box-holder">
      <span className="info-box-title">{boxTitle}</span>
      <div className="info-box-selected-value">{selectedValue}</div>
      <span className="info-box-arrow-right" />
    </div>
  );
};

InformationBox.propTypes = {
  boxTitle: PropTypes.string,
  selectedValue: PropTypes.string,
};

export default InformationBox;
