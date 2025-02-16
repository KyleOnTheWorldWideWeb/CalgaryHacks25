export const addFillLayer = (map, layer, layerVisibility) => {
  if (!map.getSource(layer.id)) {
    map.addSource(layer.id, {
      type: "geojson",
      data: layer.file,
    });

    map.addLayer({
      id: layer.id,
      type: "fill",
      source: layer.id,
      paint: {
        "fill-color": layer.color,
        "fill-opacity": layerVisibility[layer.id] ? 0.6 : 0, // 🔥 Dynamically set opacity
        "fill-outline-color": "#000",
      },
    });
  }
};

export const addHeatmapLayer = (map, layer, layerVisibility) => {
  if (!map.getSource(layer.id)) {
    map.addSource(layer.id, {
      type: "geojson",
      data: layer.file,
    });

    map.addLayer({
      id: layer.id,
      type: "heatmap",
      source: layer.id,
      paint: {
        "heatmap-weight": ["interpolate", ["linear"], ["get", "intensity"], 0, 0, 10, 1],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "rgb(103,169,207)",
          0.4, "rgb(209,229,240)",
          0.6, "rgb(253,219,199)",
          0.8, "rgb(239,138,98)",
          1, "rgb(178,24,43)"
        ],
        "heatmap-opacity": layerVisibility[layer.id] ? 0.7 : 0, // 🔥 Dynamically set opacity
      },
    });
  }
};
