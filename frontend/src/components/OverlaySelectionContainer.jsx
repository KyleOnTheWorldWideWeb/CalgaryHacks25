import React from "react";
import "../Styles/overlay_selection_container.scss";
import { useMapContext } from "../context/MapContext";
import ToggleSwitch from "./ToggleSwitch";
import MapViewControl from "./MapViewControl"; // New Component

const OverlaySelectionContainer = () => {
  const { layers, layerVisibility, toggleLayer } = useMapContext(); // ✅ Get `layers`

  return (
    <div className="overlay-selection-container">
      <h3 className="text-lg font-semibold mb-2">Map Overlay Selection</h3>

      {/* Map View Selection */}
      <MapViewControl />

      {/* Layer Toggles */}
      <h4 className="text-lg font-semibold mb-2 text-gray-900">
        Toggle Layers
      </h4>
      <div className="space-y-2">
        {layers.map(({ id, name }) => ( // ✅ Use `name` instead of `id`
          <ToggleSwitch 
            key={id} 
            label={name} // ✅ Display human-readable name
            checked={layerVisibility[id]} 
            onChange={() => toggleLayer(id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default OverlaySelectionContainer;
