import React, { useEffect, useRef, useState } from "react";
import VideoJS from "./videoJS/VideoJS.component";
import "videojs-contrib-ads";
import "./App.css";
import { useLocation } from "react-router-dom";
import { isIOS } from "react-device-detect";

function PlayerByLink() {
  const playerRef = useRef(null);
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const link = query.get("url");

  /* --------------------------------- States --------------------------------- */

  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    // fluid: true,
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
    sources: link,
    html5: {
      dash: {
        setFastSwitchEnabled: true,
      },
    },
  });

  /* -------------------------------- Functions ------------------------------- */
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

  /* ------------------------------ Side Effects ------------------------------ */

  useEffect(() => {
    setVideoJsOptions((prev) => ({
      ...prev,
      sources: [
        {
          src: link,
          type: "application/x-mpegURL",
        },
      ],
    }));

    return () => {
      localStorage.removeItem("subSettings");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let vh = window.innerHeight;
    document.documentElement.style.setProperty("--width", vh + "px");

    window.addEventListener("resize", (e) => {
      vh = window.innerHeight;

      document.documentElement.style.setProperty("--width", vh + "px");
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      {videoJsOptions.sources ? (
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      ) : null}
    </div>
  );
}

export default PlayerByLink;

// isIOS ? (
//         <video controls autoPlay>
//           <source src={link} type="application/x-mpegURL" />
//         </video>
//       ) :
