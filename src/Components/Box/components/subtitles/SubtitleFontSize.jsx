/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./subtitle.styles.scss";

const SubtitleFontSize = (props) => {
  const { handleBack, selectedValue = "", onFontSizeChange, sizes } = props;

  const [selectedSize, setSelectedSize] = useState(null);

  /* -------------------------------- Functions ------------------------------- */
  const handleChangeSize = (size) => {
    onFontSizeChange(size);
    setSelectedSize(size.label);
  };

  /* ------------------------------ Side Effects ------------------------------ */
  useEffect(() => {
    setSelectedSize(selectedValue);
  }, []);

  return (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>ّFont size</h1>
      </div>
      <div className="subtitle-box-holder">
        {sizes.map((size) => (
          <div
            className={`subtitle-box ${
              selectedSize === size.label ? "selected-subtitle" : ""
            }`}
            key={size.value}
            onClick={() => handleChangeSize(size)}
          >
            {size.label}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

SubtitleFontSize.propTypes = {
  handleBack: PropTypes.func,
  selectedValue: PropTypes.string,
  onFontSizeChange: PropTypes.func,
  sizes: PropTypes.arrayOf(PropTypes.object),
};

export default SubtitleFontSize;
