import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SubtitleBackgroundColor = (props) => {
  const { handleBack, selectedValue, onBgColorChange, colors } = props;

  const [selectedBgColor, setSelectedBgColor] = useState(null);

  const handleChangeBgColor = (color) => {
    setSelectedBgColor(color.label);
    onBgColorChange(color);
  };

  useEffect(() => {
    setSelectedBgColor(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Background Color</h1>
      </div>
      <div className="subtitle-box-holder">
        {colors.map((color) => (
          <div
            className={`subtitle-box ${
              selectedBgColor === color.label ? "selected-subtitle" : ""
            }`}
            key={color.code}
            onClick={() => handleChangeBgColor(color)}
          >
            {color.label}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

SubtitleBackgroundColor.propTypes = {
  handleBack: PropTypes.func,
  selectedValue: PropTypes.string,
  onBgColorChange: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.object),
};

export default SubtitleBackgroundColor;
