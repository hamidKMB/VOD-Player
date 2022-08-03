import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./qualities.styles.scss";

const Qualities = (props) => {
  const { player, handleBack } = props;

  const [qualities, setQualities] = useState([]);

  const handleSelectQuality = (selectedQualityIndex, selectedQualityId) => {
    setQualities(
      qualities.map((item) => ({
        ...item,
        selected: item.id === selectedQualityId,
      }))
    );

    player.qualityLevels().selectedIndex_ = selectedQualityIndex;
    player
      .qualityLevels()
      .trigger({ type: "change", selectedIndex: selectedQualityIndex });
  };

  useEffect(() => {
    if (player) {
      setQualities(
        player.qualityLevels().levels_.map((item, index) => ({
          ...item,
          selected: index === player.qualityLevels().selectedIndex_,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(qualities.map((item) => item.selected === true));

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
      </div>
    </div>
  );
};

Qualities.propTypes = {
  player: PropTypes.object,
  handleBack: PropTypes.func,
};

export default Qualities;
