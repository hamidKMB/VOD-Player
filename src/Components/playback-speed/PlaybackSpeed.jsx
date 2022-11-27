import React, { useState, useEffect } from "react";
import "./playback-speed.styles.css";

const PlaybackSpeed = (props) => {
  const values = [0.25, 0.5, 1, 1.5, 2];

  /* --------------------------------- States --------------------------------- */
  const [playbackSpeed, setPlaybackSpeed] = useState(2);

  /* -------------------------------- Functions ------------------------------- */
  const handleChangePlaybackSpeed = (value) => {
    let nValue = +value;
    setPlaybackSpeed(nValue);
  };
  /* ------------------------------- SideEffects ------------------------------ */
  useEffect(() => {
    props.player.playbackRate(values[playbackSpeed]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackSpeed]);

  return (
    <div>
      <h6 className="info-box-title">Playback Speed</h6>
      <div className="range-holder ">
        <input
          max="4"
          min="0"
          step="1"
          type="range"
          value={playbackSpeed}
          className="custom-range-input"
          onChange={(e) => handleChangePlaybackSpeed(e.target.value)}
        />
      </div>
      <div className="range-selector">
        {values.map((item, index) => (
          <div className="playback-label" key={index}>
            {item}X
          </div>
        ))}
      </div>
    </div>
  );
};

PlaybackSpeed.propTypes = {};

export default PlaybackSpeed;
