import React from "react";
import "../styles/overlay_selection_container.scss";
import { useMapContext } from "../context/MapContext";
import ToggleSwitch from "./ToggleSwitch";
import MapViewControl from "./MapViewControl"; // New Component

const OverlaySelectionContainer = () => {
  const { layerVisibility, toggleLayer } = useMapContext();

  return (
    <div className="overlay-selection-container bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Overlay Selection</h3>

      {/* Map View Selection */}
      <MapViewControl />

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
