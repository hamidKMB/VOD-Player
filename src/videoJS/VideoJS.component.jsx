import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./video-js.style.scss";
import PropTypes from "prop-types";

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

      console.log(player);

      //   player?.addChild("exampleVjsBridgeComponent");

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
