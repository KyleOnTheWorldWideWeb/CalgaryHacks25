import React from "react";
import { useMapContext } from "../context/MapContext";
import { MAP_VIEWS } from "../context/MapData";

const MapViewControl = () => {
  const { mapView, updateMapView } = useMapContext();

  return (
    <div className="mb-4">
      <select
        value={Object.keys(MAP_VIEWS).find((key) => MAP_VIEWS[key] === mapView)}
        onChange={(e) => updateMapView(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        {Object.entries(MAP_VIEWS).map(([key, value]) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MapViewControl;
