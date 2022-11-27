import React, { useState } from "react";
import "../Styles/box.styles.scss";
import Audios from "./components/Audios/Audios.component";
import InformationBoxes from "./components/Info-boxes/InformationBoxes";
import Qualities from "./components/qualities/Qualities.component";
import Subtitle from "./components/subtitles/Subtitle.component";

const Box = (props) => {
  const player = props.vjsBridgeComponent.player();

  const [selected, setSelected] = useState(null);

  const handleBack = () => {
    setSelected(null);
  };

  return (
    <div className="box box-settings">
      {/*TODO: Playback Speed component not completed */}
      {!selected ? (
        <InformationBoxes
          handleSelect={(selectedItem) => setSelected(selectedItem)}
          handleClickBack={handleBack}
          player={player}
        />
      ) : selected.boxTitle === "Qualities" ? (
        <Qualities player={player} handleBack={handleBack} />
      ) : selected.boxTitle === "Subtitles" ? (
        <Subtitle handleBack={handleBack} player={player} />
      ) : (
        selected.boxTitle === "Audios" && (
          <Audios handleBack={handleBack} player={player} />
        )
      )}
    </div>
  );
};

export default Box;
