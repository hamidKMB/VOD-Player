import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./subtitle.styles.scss";

const SubtitleFontColor = (props) => {
  const { handleBack, selectedValue, onFontColorChange, colors } = props;

  const [selectedColor, setSelectedColor] = useState(null);

  const handleChangeColor = (color) => {
    setSelectedColor(color.label);
    onFontColorChange(color);
  };

  useEffect(() => {
    setSelectedColor(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Font color</h1>
      </div>
      <div className="subtitle-box-holder">
        {colors.map((color) => (
          <div
            className={`subtitle-box ${
              selectedColor === color.label ? "selected-subtitle" : ""
            }`}
            key={color.code}
            onClick={() => handleChangeColor(color)}
          >
            {color.label}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

SubtitleFontColor.propTypes = {
  handleBack: PropTypes.func,
  selectedValue: PropTypes.string,
  onFontColorChange: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.object),
};

export default SubtitleFontColor;
