import React, { useRef } from "react";
import PropTypes from "prop-types";
import InformationBox from "../../../info-box/InformationBox.component";

const InformationBoxes = ({ handleSelect, handleClickBack, player }) => {
  // Detect selected Quality
  const selectedQualityIndex = player.qualityLevels().selectedIndex_;
  const selectedQualityTitle = `${
    player.qualityLevels().levels_[selectedQualityIndex].height
  }p`;

  // Detect selected subtitle
  const selectedSubtitle = useRef(null);

  for (let index = 0; index < player.textTracks().tracks_.length; index++) {
    const { label, mode, kind } = player.textTracks()[index];

    if (mode === "showing" && kind === "subtitles") {
      selectedSubtitle.current = label;
    }
  }

  return (
    <React.Fragment>
      <InformationBox
        boxTitle="Qualities"
        selectedValue={selectedQualityTitle}
        onClickMore={(selected) => handleSelect(selected)}
      />
      <InformationBox
        boxTitle="Subtitles"
        selectedValue={selectedSubtitle.current}
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
