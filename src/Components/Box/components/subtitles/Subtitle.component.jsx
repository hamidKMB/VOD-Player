import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./subtitle.styles.scss";
import Switch from "../../../switch-button/Switch.component";

const Subtitle = (props) => {
  const { handleBack, player } = props;

  const [subtitle, setSubtitle] = useState([]);
  const [checked, setChecked] = useState(false);

  let tracks = player.textTracks();

  const handleSelectSubtitle = (trackId) => {
    const newSubtitleArray = subtitle.map((item, index) => {
      let track = tracks[index];
      track.mode = track.id === trackId ? "showing" : "disabled";
      return {
        ...item,
        mode: trackId === item.id ? "showing" : "disabled",
        selected: trackId === item.id,
      };
    });

    setSubtitle(newSubtitleArray);
  };

  const handleChangeSwitch = (newCheckValue) => {
    setChecked(newCheckValue);
    if (newCheckValue) {
      handleSelectSubtitle("off");
    } else {
      handleSelectSubtitle("English");
    }
  };

  useEffect(() => {
    if (player) {
      const subtitleTracks = [];

      for (let index = 0; index < tracks.tracks_.length; index++) {
        const { label, kind, cues, activeCues, id, mode, language } =
          tracks[index];
        subtitleTracks.push({
          label,
          kind,
          cues,
          activeCues,
          id,
          mode,
          language,
        });
      }

      setSubtitle(
        subtitleTracks.map((item, index) => ({
          ...item,
          selected: item.mode === "showing",
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Subtitles/cc ({subtitle.length})</h1>
      </div>
      <div className="subtitle-box-holder">
        {subtitle
          .filter((item) => item.kind !== "metadata")
          .map((item, index) => {
            return (
              <div
                className={`subtitle-box ${
                  item.selected ? "selected-subtitle" : ""
                }`}
                key={index}
                onClick={() => {
                  setChecked(false);
                  handleSelectSubtitle(item.id);
                }}
              >
                {item.label}
              </div>
            );
          })}
      </div>
      <div className="check-disable-subtitle-box">
        <span className="title">Disable subtitle ?</span>
        <Switch checked={checked} onChange={handleChangeSwitch} />
      </div>
    </React.Fragment>
  );
};

Subtitle.propTypes = {
  handleBack: PropTypes.func,
  player: PropTypes.object,
};

export default Subtitle;
