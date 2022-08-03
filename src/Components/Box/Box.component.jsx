import React, { useState } from "react";
import InformationBox from "../info-box/InformationBox.component";
import "../Styles/box.styles.scss";
import PlaybackSpeed from "./components/Playback/PlaybackSpeed.component";

const Box = (props) => {
  const player = props.vjsBridgeComponent;

  console.log({
    bridgeComponent: player,
    player: player.player(),
  });

  return (
    <div className="box box-settings">
      {/*TODO: Playback Speed component not completed */}
      {/* <PlaybackSpeed /> */}
      <InformationBox boxTitle="Qualities" selectedValue="720p" />
    </div>
  );
};

export default Box;
