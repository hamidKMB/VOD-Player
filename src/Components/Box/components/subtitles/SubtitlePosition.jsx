import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./subtitle.styles.scss";

const SubtitlePosition = (props) => {
  const { handleBack, onPositionChange, selectedValue } = props;

  const [position, setPosition] = useState("Bottom");

  const el = document.querySelector(".vjs-text-track-cue");

  const handleChange = (position) => {
    setPosition(position);
    onPositionChange(position);

    if (el) el.style.top = position === "Bottom" ? "unset" : "0";
  };

  useEffect(() => {
    setPosition(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Position</h1>
      </div>
      <div className="subtitle-position-setting-style">
        <div className="subtitle-position-setting-holder">
          <div
            className={`subtitle-box ${
              position === "Top" ? "selected-subtitle" : ""
            }`}
            onClick={() => handleChange("Top")}
          >
            Top
          </div>
          <div
            className={`subtitle-box ${
              position === "Bottom" ? "selected-subtitle" : ""
            }`}
            onClick={() => handleChange("Bottom")}
          >
            Bottom
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

SubtitlePosition.propTypes = {
  handleBack: PropTypes.func,
  onPositionChange: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default SubtitlePosition;
