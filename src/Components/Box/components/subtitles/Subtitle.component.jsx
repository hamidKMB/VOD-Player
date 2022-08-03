import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./subtitle.styles.scss";

const Subtitle = (props) => {
  const { handleBack, player } = props;

  const [subtitle, setSubtitle] = useState([]);

  console.log(player.textTracks());

  useEffect(() => {
    if (player) {
      let tracks = player.textTracks();

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

      console.log(subtitleTracks);

      setSubtitle(
        subtitleTracks.map((item, index) => ({
          ...item,
          selected: index === player.textTracks().selectedIndex_,
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
        {subtitle.map((item, index) => {
          console.log(item);
          return (
            <div
              className={`subtitle-box ${
                item.selected ? "selected-subtitle" : ""
              }`}
              key={index}
              onClick={() => {
                // player.textTracks().selectedIndex_ = index;
                // player.textTracks().trigger({
                //   type: "change",
                //   selectedIndex: index,
                // });
                console.log("hello");
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

Subtitle.propTypes = {
  handleBack: PropTypes.func,
  player: PropTypes.object,
};

export default Subtitle;
