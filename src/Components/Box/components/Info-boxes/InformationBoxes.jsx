import React from "react";
import PropTypes from "prop-types";
import InformationBox from "../../../info-box/InformationBox.component";

const InformationBoxes = ({ handleSelect, handleClickBack, player }) => {
  console.log(player.qualityLevels().selectedIndex_);

  const selectedQualityIndex = player.qualityLevels().selectedIndex_;
  const selectedQualityTitle = `${
    player.qualityLevels().levels_[selectedQualityIndex].height
  }p`;

  return (
    <React.Fragment>
      <InformationBox
        boxTitle="Qualities"
        selectedValue={selectedQualityTitle}
        onClickMore={(selected) => handleSelect(selected)}
      />
      <InformationBox
        boxTitle="Subtitles"
        selectedValue="English"
        onClickMore={(selected) => handleSelect(selected)}
      />
    </React.Fragment>
  );
};

InformationBoxes.propTypes = {
  handleSelect: PropTypes.func,
  handleClickBack: PropTypes.func,
};

export default InformationBoxes;
