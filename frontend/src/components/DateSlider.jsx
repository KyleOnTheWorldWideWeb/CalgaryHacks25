import React from "react";
import "../Styles/slider.scss";
import { useMapContext } from "../context/MapContext"; // Import the context

const DateSlider = () => {
  const { year, updateYear } = useMapContext(); // Get year & update function

  return (
    <div className="date-slider-container">
      <div className="selected-date">
        Selected Year: {year}
      </div>
      <input
        type="range"
        min="1950"
        max="2010"
        step="1"
        value={year}
        onChange={(e) => updateYear(Number(e.target.value))}
        className="date-slider"
      />
    </div>
  );
};

export default DateSlider;
