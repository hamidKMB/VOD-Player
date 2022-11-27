import React, { useEffect, useRef } from "react";
import VideoJS from "./videoJS/VideoJS.component";
import "videojs-contrib-ads";
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
        src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
        // type: "video/mp4",
      },
    ],
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("subSettings");
    };
  }, []);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

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
