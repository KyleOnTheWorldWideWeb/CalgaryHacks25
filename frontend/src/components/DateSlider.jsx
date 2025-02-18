import React from "react";
import "../Styles/slider.scss";
import { useMapContext } from "../context/MapContext"; // Import the context
import { MAP_DATES } from "../context/MapData";

const DateSlider = () => {
  const { year, updateYear } = useMapContext(); // Get year & update function

  return (
    <div className="date-slider-container">
      <div className="selected-date">
        Selected Year: {year}
      </div>
      <input
        type="range"
        min={MAP_DATES.Start}
        max={MAP_DATES.End}
        step="1"
        value={year}
        onChange={(e) => updateYear(Number(e.target.value))}
        className="date-slider"
      />
    </div>
  );
};

export default DateSlider;
