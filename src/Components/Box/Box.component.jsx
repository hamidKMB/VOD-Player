import React, { useEffect, useState } from "react";
import "../Styles/box.styles.scss";
import InformationBoxes from "./components/Info-boxes/InformationBoxes";
// import PlaybackSpeed from "./components/Playback/PlaybackSpeed.component";
import Qualities from "./components/qualities/Qualities.component";

const Box = (props) => {
  const player = props.vjsBridgeComponent.player();

  const [selected, setSelected] = useState(null);

  const handleBack = () => {
    setSelected(null);
  };

  console.log(player.qualityLevels().levels_);

  // useEffect(() => {
  //   if (selected?.boxTitle === "Qualities") {
  //     setQualities(
  //       playerInstance.qualityLevels().levels_.map((item) => item.height `${item.height}p`)
  //     );
  //   }
  // }, [selected]);

  console.log(selected);

  return (
    <div className="box box-settings">
      {/*TODO: Playback Speed component not completed */}
      {/* <PlaybackSpeed /> */}
      {!selected ? (
        <InformationBoxes
          handleSelect={(selectedItem) => setSelected(selectedItem)}
          handleClickBack={handleBack}
          player={player}
        />
      ) : selected.boxTitle === "Qualities" ? (
        <Qualities player={player} handleBack={handleBack} />
      ) : null}
    </div>
  );
};

export default Box;
