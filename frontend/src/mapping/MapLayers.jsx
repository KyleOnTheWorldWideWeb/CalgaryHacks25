import React, { useEffect } from "react";
import { useMapContext } from "../context/MapContext";
import { addFillLayer, addHeatmapLayer } from "./MapLayerUtils";

const MapLayers = ({ map }) => {
  const { layerVisibility, layerRefresh } = useMapContext(); // **Watch for refresh state**

  useEffect(() => {
    if (!map) return;

    // Fetch layerConfig.json dynamically
    fetch("/config/layerConfig.json")
      .then((response) => response.json())
      .then((layers) => {
        layers.forEach((layer) => {
          if (layerVisibility[layer.id]) {
            if (layer.type === "heatmap") {
              addHeatmapLayer(map, layer);
            } else {
              addFillLayer(map, layer);
            }
          } else {
            if (map.getLayer(layer.id)) {
              map.removeLayer(layer.id);
              map.removeSource(layer.id);
            }
          }
        });
      })
      .catch((error) => console.error("Error loading layers:", error));
    }, [layerVisibility, map, layerRefresh]); // **Re-run when refresh state changes**

  return null;
};

export default MapLayers;
