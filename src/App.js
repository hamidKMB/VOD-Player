import React, { useRef } from "react";
import VideoJS from "./videoJS/VideoJS.component";
// import videojs from "video.js";
import "./App.css";
import VideoPlayer from "./videoJS/VideoJsClassComponent";
import Button from "./Components/Button/Button";

function App() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    bigPlayButton: false,
    controlBar: {
      children: [
        "currentTimeDisplay",
        "progressControl",
        "playToggle",
        "currentTimeDisplay",
        "remainingTimeDisplay",
        "timeDivider",
        "volumePanel",
        "fullscreenToggle",
        // "liveDisplay",
      ],
    },
    sources: [
      {
        src: "//vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    console.dir(playerRef.current.children_[6].volumePanel);

    // You can handle player events here, for example:
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <Button
        icon="Settings"
        positionPlacement={{ bottom: "1.1rem", left: "1.1rem", color: "#fff" }}
      />
      <Button
        icon="Episodes"
        positionPlacement={{ bottom: "1.1rem", right: "3.1rem", color: "#fff" }}
      />
    </div>
    // <VideoPlayer {...videoJsOptions} />
  );
}

export default App;
