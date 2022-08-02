import React, { useState } from "react";
import "../Styles/box.styles.scss";

const Box = (props) => {
  const player = props.vjsBridgeComponent;

  const [first, setfirst] = useState("hello world");

  const change = () => {
    setfirst("hello world 2");
  };

  console.log({
    bridgeComponent: player,
    player: player.player(),
  });

  return (
    <div className="box box-settings" style={{ textAlign: "center" }}>
      <h1>{first}</h1>
      <button onClick={change}>Change</button>
    </div>
  );
};

export default Box;
