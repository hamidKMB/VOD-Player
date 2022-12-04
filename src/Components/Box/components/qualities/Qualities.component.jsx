import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./qualities.styles.scss";

const Qualities = (props) => {
  const { player, handleBack } = props;

  const [qualities, setQualities] = useState([]);
  const isAutoSelected = player.state.isAutoQuality;

  const handleSelectQuality = (selectedQualityIndex, selectedQualityId) => {
    player.setState((prev) => ({
      ...prev,
      isAutoQuality: selectedQualityIndex === "auto",
    }));

    setQualities(
      qualities.map((item) => ({
        ...item,
        selected:
          selectedQualityIndex === "auto"
            ? false
            : item.id === selectedQualityId,
      }))
    );

    player.qualityLevels().selectedIndex_ =
      selectedQualityIndex === "auto" ? -1 : selectedQualityIndex;

    player.qualityLevels().trigger({
      type: "change",
      selectedIndex:
        selectedQualityIndex === "auto" ? -1 : selectedQualityIndex,
    });

    player?.tech_?.vhs?.representations().forEach((rep, idx) => {
      if (selectedQualityIndex === "auto") {
        rep.enabled(true);
      } else {
        rep.enabled(idx === selectedQualityIndex);
      }
    });
  };

  useEffect(() => {
    if (player) {
      setQualities(
        player.qualityLevels().levels_.map((item, index) => ({
          ...item,
          selected: isAutoSelected
            ? false
            : index === player.qualityLevels().selectedIndex_,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Quality</h1>
      </div>
      <div className="qualities-box-holder">
        {qualities.map((item, index) => {
          return (
            <div
              className={`qualities-box ${
                item.selected ? "selected-quality" : ""
              }`}
              key={index}
              onClick={() => handleSelectQuality(index, item.id)}
            >
              {item.height}p
            </div>
          );
        })}
        <div
          className={`qualities-box ${
            isAutoSelected ? "selected-quality" : ""
          }`}
          onClick={() => handleSelectQuality("auto")}
        >
          Auto
        </div>
      </div>
    </div>
  );
};

Qualities.propTypes = {
  player: PropTypes.object,
  handleBack: PropTypes.func,
};

export default Qualities;
