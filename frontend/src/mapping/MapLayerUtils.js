export const addFillLayer = (map, layer, layerVisibility, year = null) => {
  fetch(layer.file)
    .then(response => response.json())
    .then(data => {
      let filteredData = data;

      // If it's time-series and a year is selected, filter features
      if (layer.dataScope === "Time Series" && year !== null) {
        filteredData = {
          type: "FeatureCollection",
          features: data.features.filter(feature => feature.properties.year === year),
        };
      }

      if (!map.getSource(layer.id)) {
        map.addSource(layer.id, {
          type: "geojson",
          data: filteredData,
        });

        map.addLayer({
          id: layer.id,
          type: "fill",
          source: layer.id,
          paint: {
            "fill-color": layer.color,
            "fill-opacity": layerVisibility[layer.id] ? 0.6 : 0, // Dynamic opacity
            "fill-outline-color": "#000",
          },
        });
      } else {
        // Update source data dynamically when the year changes
        map.getSource(layer.id).setData(filteredData);
      }
    })
    .catch(error => console.error(`Error loading fill layer (${layer.id}):`, error));
};


export const addHeatmapLayer = (map, layer, layerVisibility, year = null) => {
  fetch(layer.file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${layer.file}`);
      return response.json();
    })
    .then(data => {
      console.log(`Loaded GeoJSON: ${layer.id}`, data);

      let filteredData = data;

      // Filter features to selected year
      if (layer.dataScope === "Time Series" && year !== null) {
        filteredData = {
          type: "FeatureCollection",
          features: data.features.filter(feature => feature.properties.year === year),
        };
      }

      console.log(`Filtered Data for Year ${year}:`, filteredData);

      // **Find Min and Max Temperature in Data for Scaling**
      const values = filteredData.features.map(f => f.properties.data);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      console.log(`Data Range: Min ${minValue}, Max ${maxValue}`);

      // Use default color range or fallback
      const heatMapGradient = Array.isArray(layer.heatMapRange) && layer.heatMapRange.length >= 3
        ? layer.heatMapRange 
        : ["rgba(0,0,0,0)", "yellow", "red"]; // ❗ FIXED: Set transparent background instead of blue

      if (!map.getSource(layer.id)) {
        map.addSource(layer.id, {
          type: "geojson",
          data: filteredData,
        });

        map.addLayer({
          id: layer.id,
          type: "heatmap",
          source: layer.id,
          paint: {
            // ❗ FIXED: Stops affecting the entire map
            "heatmap-color": [
              "step",
              ["heatmap-density"],
              heatMapGradient[0], // Transparent background
              0.2, heatMapGradient[1], // Yellow (medium density)
              0.5, heatMapGradient[2]  // Red (high density)
            ],

            // ❗ FIXED: Reduce the spread of the heatmap
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5, 15, // Lower zoom → Smaller spread
              10, 25 // Higher zoom → Larger spread
            ],

            // ❗ FIXED: Ensure only real data points get colored
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5, 0.8,
              10, 1.5
            ],

            "heatmap-opacity": layerVisibility[layer.id] ? 0.7 : 0,
          },
        });
      } else {
        // Update source when year changes
        map.getSource(layer.id).setData(filteredData);
      }
    })
    .catch(error => console.error(`Error loading heatmap layer (${layer.id}):`, error));
};
