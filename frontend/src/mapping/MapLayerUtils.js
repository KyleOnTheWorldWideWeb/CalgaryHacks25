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

      // Filter by selected year
      if (layer.dataScope === "Time Series" && year !== null) {
        filteredData = {
          type: "FeatureCollection",
          features: data.features.filter(feature => feature.properties.year === year),
        };
      }

      console.log(`Filtered Data for Year ${year}:`, filteredData);

      // Find min and max temperature
      const values = filteredData.features.map(f => f.properties.data);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      console.log(`Temperature Range: Min ${minValue}, Max ${maxValue}`);

      if (!map.getSource(layer.id)) {
        map.addSource(layer.id, {
          type: "geojson",
          data: filteredData,
        });

        map.addLayer({
          id: layer.id,
          type: "circle",
          source: layer.id,
          paint: {
            // Color scale for temperature (-32.26°C to 37.08°C)
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "data"], // Temperature property
              minValue, "blue",   // Coldest (blue)
              0, "yellow",        // Midpoint (yellow)
              maxValue, "red"     // Hottest (red)
            ],

            // Adjust circle radius dynamically based on zoom for better blending
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5, 10,   // Small radius at low zoom
              10, 25   // Larger radius at higher zoom
            ],

            // NEW: Slight blur to make points merge better
            "circle-blur": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5, 0.2,  // Low blur at small zoom
              10, 0.5  // More blur at high zoom for soft blending
            ],

            // Slight opacity for better blending
            "circle-opacity": layerVisibility[layer.id] ? 0.7 : 0.0,
          },
        });
      } else {
        // Update data if year changes
        map.getSource(layer.id).setData(filteredData);
      }
    })
    .catch(error => console.error(`Error loading temperature layer (${layer.id}):`, error));
};
