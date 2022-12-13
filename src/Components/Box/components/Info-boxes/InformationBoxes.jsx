import React, { useRef } from "react";
import PropTypes from "prop-types";
import InformationBox from "../../../info-box/InformationBox.component";
import PlaybackSpeed from "../../../playback-speed/PlaybackSpeed";

const InformationBoxes = ({ handleSelect, handleClickBack, player }) => {
  // Detect selected Quality
  const selectedQualityIndex = player.qualityLevels().selectedIndex_;
  const isAuto = Boolean(
    player.qualityLevels().levels_[selectedQualityIndex]?.height
  );

  const selectedQualityTitle = isAuto
    ? `${player.qualityLevels().levels_[selectedQualityIndex]?.height}p`
    : "Auto";

  // Detect selected subtitle
  const selectedSubtitle = useRef(null);

  for (let index = 0; index < player.textTracks().tracks_.length; index++) {
    const { label, mode, kind } = player.textTracks()[index];

    if (mode === "showing" && kind === "subtitles") {
      selectedSubtitle.current = label;
    }
  }

  // Detect Selected Audio
  const selectedAudio = useRef(null);
  const countOfAudios = player.audioTracks().tracks_.length;

  for (let index = 0; index < countOfAudios; index++) {
    const { label, enabled } = player.audioTracks()[index];

    if (enabled) {
      selectedAudio.current = label;
    }
  }

  return (
    <React.Fragment>
      <div className="p-3 pb-2">
        <PlaybackSpeed player={player} />
      </div>
      {player.qualityLevels().length ? (
        <InformationBox
          boxTitle="Qualities"
          selectedValue={
            player.state.isAutoQuality ? "Auto" : selectedQualityTitle
          }
          onClickMore={(selected) => handleSelect(selected)}
        />
      ) : null}
      {player.textTracks().tracks_.length > 1 ? (
        <InformationBox
          boxTitle="Subtitles"
          selectedValue={selectedSubtitle.current}
          onClickMore={(selected) => handleSelect(selected)}
        />
      ) : null}
      {countOfAudios > 1 && (
        <InformationBox
          boxTitle="Audios"
          selectedValue={selectedAudio.current}
          onClickMore={(selected) => handleSelect(selected)}
        />
      )}
    </React.Fragment>
  );
};

InformationBoxes.propTypes = {
  handleSelect: PropTypes.func,
  handleClickBack: PropTypes.func,
};

export default InformationBoxes;
