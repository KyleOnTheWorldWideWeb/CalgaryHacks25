import { useState } from "react";
import "../styles/slider.scss";

const DateSlider = ({ startDate, endDate }) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const [selectedDate, setSelectedDate] = useState(start);

  const handleChange = (event) => {
    setSelectedDate(parseInt(event.target.value));
  };

  return (
    <div className="date-slider-container">
      <div className="selected-date">
        Selected Date: {new Date(selectedDate).toLocaleDateString()}
      </div>
      <input
        type="range"
        min={start}
        max={end}
        step={24 * 60 * 60 * 1000} // Step is one day
        value={selectedDate}
        onChange={handleChange}
        className="date-slider"
      />
    </div>
  );
};

export default DateSlider;
