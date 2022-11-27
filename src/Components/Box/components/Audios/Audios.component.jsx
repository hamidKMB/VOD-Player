import React, { useEffect, useState } from "react";

const Audios = (props) => {
  const { handleBack, player } = props;

  const [audio, setAudio] = useState([]);

  let tracks = player.audioTracks();

  const handleSelectAudio = (trackId) => {
    const newAudioTrackArray = audio.map((item, index) => {
      let track = tracks[index];
      track.enabled = track.id === trackId;
      return {
        ...item,
        selected: track.id === trackId,
      };
    });

    setAudio(newAudioTrackArray);
  };

  useEffect(() => {
    if (player) {
      const subtitleTracks = [];

      for (let index = 0; index < tracks.tracks_.length; index++) {
        const { label, kind, id, language, enabled } = tracks[index];
        subtitleTracks.push({
          label,
          kind,
          enabled,
          id,
          language,
        });
      }

      setAudio(
        subtitleTracks.map((item, index) => ({
          ...item,
          selected: item.enabled,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Audios ({audio.length})</h1>
      </div>
      <div className="subtitle-box-holder">
        {audio.map((item, index) => {
          return (
            <div
              className={`subtitle-box ${
                item.selected ? "selected-subtitle" : ""
              }`}
              key={index}
              onClick={() => {
                handleSelectAudio(item.id);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Audios;
