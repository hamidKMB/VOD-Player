import React, { Fragment, useEffect, useRef, useState } from "react";
import VideoJS from "./videoJS/VideoJS.component";
import "videojs-contrib-ads";
import "./App.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getContentDetail } from "./Redux/Player/playerSlice";
import getContentDetails, { getContentSrc } from "./API/contentApi";
import { isIOS } from "react-device-detect";

function AppV() {
  const playerRef = useRef(null);
  const { streamUrl } = useParams();
  const dispatch = useDispatch();

  /* --------------------------------- States --------------------------------- */
  const [playerDetails, setPlayerDetails] = useState(null);
  const [streamDetail, setStreamDetail] = useState(null);
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
    sources: null,
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
    getContentDetails(streamUrl)
      .then((res) => {
        setPlayerDetails(res.data.result);
        dispatch(getContentDetail(res.data.result));
        getContentSrc(streamUrl)
          .then((res) => {
            setStreamDetail(res.data.result);
            if (isIOS) {
              setVideoJsOptions((prev) => ({
                ...prev,
                sources: [
                  {
                    src: res.data.result.mp4,
                    type: "video/mp4",
                  },
                ],
              }));
            } else {
              setVideoJsOptions((prev) => ({
                ...prev,
                sources: [
                  {
                    src: res.data.result.hls,
                    // src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
                    type: "application/x-mpegURL",
                  },
                ],
              }));
            }
          })
          .catch((err) => err);
      })
      .catch((err) => err);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let vh = window.innerHeight;
    document.documentElement.style.setProperty("--width", vh + "px");

    window.addEventListener("orientationchange", (e) => {
      if (e.currentTarget.orientation === 0) {
        vh = window.innerHeight;
      }

      document.documentElement.style.setProperty("--width", vh + "px");
    });
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("subSettings");
    };
  }, []);

  return (
    <div style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
      {videoJsOptions.sources && streamDetail && (
        <VideoJS
          options={videoJsOptions}
          onReady={handlePlayerReady}
          videoDetails={playerDetails}
          streamDetail={streamDetail}
        />
      )}
    </div>
  );
}

export default AppV;
