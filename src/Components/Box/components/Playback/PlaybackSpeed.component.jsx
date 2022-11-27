import React, { useState } from "react";
import PropTypes from "prop-types";
import "./playback.styles.scss";

const PlaybackSpeed = (props) => {
  const [playBackSpeed, setPlayBackSpeed] = useState(1);

  return (
    <React.Fragment>
      <h3 className="playback-title">Playback Speed</h3>
      <input
        value={playBackSpeed}
        type="range"
        className="range-picker"
        min={0.25}
        max={2}
        step={playBackSpeed / 2}
        onChange={(e) => setPlayBackSpeed(e.target.value)}
      />
    </React.Fragment>
  );
};

PlaybackSpeed.propTypes = {};

export default PlaybackSpeed;
