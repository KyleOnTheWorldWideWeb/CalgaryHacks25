import React from "react";
import "../Styles/overlay_selection_container.scss";
import { useMapContext } from "../context/MapContext";
import ToggleSwitch from "./ToggleSwitch";
import MapViewControl from "./MapViewControl";

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
      <div className="space-y-4">
        {layers.map(({ id, name, color, dataScope }) => { 
          const isTimeSeries = dataScope === "Time Series"; // ✅ Check if it's time-series

          return (
            <div key={id} className="flex items-center justify-between space-x-2">
              {/* Toggle Switch */}
              <ToggleSwitch 
                label={name} 
                checked={layerVisibility[id]} 
                onChange={() => toggleLayer(id)} 
              />

              {/* Color Box (Hidden for Time Series Layers) */}
              {!isTimeSeries && (
                <div 
                  className="h-4 w-4 rounded border border-gray-400" 
                  style={{ backgroundColor: color }} 
                  title={`Layer color: ${color}`}
                />
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default OverlaySelectionContainer;
