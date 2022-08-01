import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./video-js.style.scss";
import PropTypes from "prop-types";
import { ReactComponent as Settings } from "../assets/icons/Setting.svg";

const VideoJS = (props) => {
  /* ---------------------------------- Props --------------------------------- */
  const { options, onReady } = props;

  /* ---------------------------------- Refs ---------------------------------- */

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  console.log({
    videoRef: videoRef.current,
    playerRef: playerRef.current,
    options,
  });

  console.log(!playerRef.current);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;
      let player = playerRef.current;

      player = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      });

      let Button = videojs.getComponent("button");

      let SettingsButton = videojs.extend(Button, {
        constructor: function (player, options) {
          Button.call(this, player, options);
          this.addClass("vjs-custom-button");
          this.addClass("vjs-settings-button");
        },
        handleClick: function () {
          console.log("Settings button clicked");
        },
      });

      if (
        player.getChild("controlBar").children_[2].options_.name !==
        "SettingsButton"
      ) {
        videojs.registerComponent("SettingsButton", SettingsButton);

        player.getChild("ControlBar").addChild("SettingsButton", {}, 2);
      }

      let PlaylistButton = videojs.extend(Button, {
        constructor: function (player, options) {
          Button.call(this, player, options);
          this.addClass("vjs-custom-button");
          this.addClass("vjs-playlist-button");
        },
        handleClick: function () {
          console.log("Playlist button clicked");
        },
      });

      if (
        player.getChild("controlBar").children_[3].options_.name !==
        "PlaylistButton"
      ) {
        videojs.registerComponent("PlaylistButton", PlaylistButton);

        player.getChild("ControlBar").addChild("PlaylistButton", {}, 3);
      }

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      //   const player = playerRef.current;
      //   player.autoplay(options.autoplay);
      //   player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-matrix  vjs-big-play-centered"
      />
    </div>
  );
};

VideoJS.propTypes = {
  options: PropTypes.object,
  onReady: PropTypes.func,
};

export default VideoJS;
