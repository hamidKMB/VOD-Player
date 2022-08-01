import React, { useRef } from "react";
import VideoJS from "./videoJS/VideoJS.component";
import "./App.css";

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

    console.dir(playerRef.current);

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
    </div>
  );
}

export default App;
