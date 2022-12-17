import React from "react";
import PropTypes from "prop-types";
import "./information-box.styles.scss";

const InformationBox = (props) => {
  /* ---------------------------------- Props --------------------------------- */
  const { boxTitle, selectedValue, onClickMore } = props;

  return (
    <div
      className="info-box-holder"
      onClick={() => onClickMore({ selectedValue, boxTitle })}
    >
      <span className="info-box-title">{boxTitle}</span>
      <div
        className="info-box-selected-value"
        onClick={() => onClickMore({ selectedValue, boxTitle })}
      >
        {selectedValue}
        <div className="info-box-arrow-right" />
      </div>
    </div>
  );
};

InformationBox.propTypes = {
  boxTitle: PropTypes.string,
  selectedValue: PropTypes.string,
  onClickMore: PropTypes.func,
};

export default InformationBox;
