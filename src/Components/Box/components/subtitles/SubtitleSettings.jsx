import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./subtitle.styles.scss";
import InformationBox from "../../../info-box/InformationBox.component";
import SubtitleFontSize from "./SubtitleFontSize";
import SubtitleFontColor from "./SubtitleFontColor";
import SubtitleBackgroundColor from "./SubtitleBackgroundColor";
import SubtitlePosition from "./SubtitlePosition";

const settingsTitles = {
  fontSize: "Font size",
  fontColor: "Font color",
  backgroundColor: "Background Color",
};

const colors = [
  {
    label: "White",
    code: "#FFF",
  },
  {
    label: "Yellow",
    code: "#FF0",
  },
  {
    label: "Green",
    code: "#0F0",
  },
  {
    label: "Cyan",
    code: "#0FF",
  },
  {
    label: "Blue",
    code: "#00F",
  },
  {
    label: "Magneta",
    code: "#F0F",
  },
  {
    label: "Red",
    code: "#F00",
  },
  {
    label: "Black",
    code: "#000",
  },
];

const fontPercents = [
  {
    label: "50%",
    value: 0.5,
  },
  {
    label: "75%",
    value: 0.75,
  },
  {
    label: "100%",
    value: 1,
  },
  {
    label: "150%",
    value: 1.5,
  },
  {
    label: "200%",
    value: 2,
  },
  {
    label: "300%",
    value: 3,
  },
  {
    label: "400%",
    value: 4,
  },
];

const defaultSubSetting = {
  color: {
    label: "White",
    code: "#FFF",
  },
  backgroundColor: {
    label: "Black",
    code: "#000",
  },
  fontPercent: {
    label: "100%",
    value: 1,
  },
  top: "unset",
};

const SubtitleSettings = (props) => {
  const { handleBack, player } = props;
  const { fontSize, fontColor, backgroundColor, position } = settingsTitles;

  /* --------------------------------- States --------------------------------- */
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [selectedSettingsOptions, setSelectedSettingsOptions] = useState(null);

  /* -------------------------------- Functions ------------------------------- */
  const handleBackSettings = () => setSelectedSetting(null);
  const onClickMoreSettings = ({ selectedValue, boxTitle }) =>
    setSelectedSetting({ selectedValue, boxTitle });

  const handleChangeOptions = (name, value) => {
    setSelectedSettingsOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ------------------------------- sideEffects ------------------------------ */
  useEffect(() => {
    if (selectedSettingsOptions === null) {
      const subSettings = JSON.parse(localStorage.getItem("subSettings"));

      if (subSettings) {
        const dataToSet = {
          ...subSettings,
          color: colors.filter((color) => color.code === subSettings.color)[0],
          backgroundColor: colors.find(
            (color) => color.code === subSettings.backgroundColor
          ),
          fontPercent: fontPercents.filter(
            (fontPercent) => fontPercent.value === subSettings.fontPercent
          )[0],
        };
        console.log(player.textTrackDisplay);

        setSelectedSettingsOptions(dataToSet);
      } else {
        setSelectedSettingsOptions(defaultSubSetting);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedSettingsOptions !== null) {
      const objToSet = {
        ...player.textTrackSettings.getValues(),
        color: selectedSettingsOptions?.color.code,
        backgroundColor: selectedSettingsOptions?.backgroundColor.code,
        fontPercent: selectedSettingsOptions?.fontPercent?.value,
        top: "0",
      };

      // Set Value to Player VideoJS
      player.textTrackSettings.setDefaults();
      player.textTrackSettings.setValues(objToSet);
      player.textTrackSettings.updateDisplay();

      //Set Value to Local Storage
      localStorage.setItem("subSettings", JSON.stringify(objToSet));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSettingsOptions]);

  return selectedSetting === null ? (
    <React.Fragment>
      <div className="head-details">
        <span className="back-arrow" onClick={handleBack} />
        <h1>Subtitle/Settings</h1>
      </div>
      <InformationBox
        boxTitle={fontSize}
        selectedValue={selectedSettingsOptions?.fontPercent?.label}
        onClickMore={onClickMoreSettings}
      />
      <InformationBox
        boxTitle={fontColor}
        selectedValue={selectedSettingsOptions?.color?.label}
        onClickMore={onClickMoreSettings}
      />
      <InformationBox
        boxTitle={backgroundColor}
        selectedValue={selectedSettingsOptions?.backgroundColor?.label}
        onClickMore={onClickMoreSettings}
      />
    </React.Fragment>
  ) : selectedSetting?.boxTitle === fontSize ? (
    <SubtitleFontSize
      handleBack={handleBackSettings}
      selectedValue={selectedSettingsOptions?.fontPercent?.label}
      sizes={fontPercents}
      onFontSizeChange={(size) => handleChangeOptions("fontPercent", size)}
    />
  ) : selectedSetting?.boxTitle === fontColor ? (
    <SubtitleFontColor
      handleBack={handleBackSettings}
      selectedValue={selectedSettingsOptions.color.label}
      onFontColorChange={(color) => handleChangeOptions("color", color)}
      colors={colors}
    />
  ) : (
    selectedSetting?.boxTitle === backgroundColor && (
      <SubtitleBackgroundColor
        handleBack={handleBackSettings}
        selectedValue={selectedSettingsOptions.backgroundColor.label}
        onBgColorChange={(bgColor) =>
          handleChangeOptions("backgroundColor", bgColor)
        }
        colors={colors}
      />
    )
  );
};

SubtitleSettings.propTypes = {
  handleBack: PropTypes.func,
};

export default SubtitleSettings;
