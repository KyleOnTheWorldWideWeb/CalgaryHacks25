import { useState } from "react";

const DateSlider = ({ startDate, endDate }) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const [selectedDate, setSelectedDate] = useState(start);

  const handleChange = (event) => {
    setSelectedDate(parseInt(event.target.value));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-lg font-medium">
        Selected Date: {new Date(selectedDate).toLocaleDateString()}
      </div>
      <input
        type="range"
        min={start}
        max={end}
        step={24 * 60 * 60 * 1000} // Step is one day
        value={selectedDate}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default DateSlider;
