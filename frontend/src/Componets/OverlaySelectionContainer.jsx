import React from "react";
import "../Styles/overlay_selection_container.scss";
import { useMapContext } from "../context/MapContext";
import ToggleSwitch from "./ToggleSwitch";

const OverlaySelectionContainer = () => {
  const { year, updateYear, layerVisibility, toggleLayer } = useMapContext();

  return (
    <div className="overlay-selection-container bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Overlay Selection</h3>

      {/* Year Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Year: {year}</label>
        <input
          type="range"
          min="1950"
          max="2010"
          value={year}
          onChange={(e) => updateYear(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Layer Toggles */}
      <h4 className="text-md font-semibold mb-2">Toggle Layers</h4>
      <div className="space-y-2">
        {Object.entries(layerVisibility).map(([key, value]) => (
          <ToggleSwitch key={key} label={key} checked={value} onChange={() => toggleLayer(key)} />
        ))}
      </div>
    </div>
  );
};

export default OverlaySelectionContainer;
