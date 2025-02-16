import React, { createContext, useContext, useState, useEffect } from "react";
import { MAP_VIEWS, MAP_DATES } from "./MapData";

// Create Context
const MapContext = createContext();

// Custom Hook for easier access
export const useMapContext = () => useContext(MapContext);

// Provider Component
export const MapProvider = ({ children }) => {
  const startYear = MAP_DATES.Start;
  const endYear = MAP_DATES.End;

  // State for the current year (1950-2010)
  const [year, setYear] = useState(startYear);

  // State for selected map view
  const [mapView, setMapView] = useState(MAP_VIEWS.streets); // Default view

  // State for layer visibility
  const [layerVisibility, setLayerVisibility] = useState({});

  // Store full layer details
  const [layers, setLayers] = useState([]);

  // State for layer refresh
  const [layerRefresh, setLayerRefresh] = useState(false);

  // Load layer data from layerConfig.json on mount
  useEffect(() => {
    fetch("/config/layerConfig.json") // Ensure correct path
      .then((response) => response.json())
      .then((data) => {
        setLayers(data); // Store full layer details

        // Initialize visibility state dynamically
        const initialVisibility = data.reduce((acc, layer) => {
          acc[layer.id] = layer.visible ?? true; // Default to true if missing
          return acc;
        }, {});
        setLayerVisibility(initialVisibility);
      })
      .catch((error) => console.error("Error loading layer config:", error));
  }, []);

  // Toggle Layer Visibility
  const toggleLayer = (layerId) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));

    // **Trigger refresh when toggling a layer**
    setLayerRefresh((prev) => !prev);
  };

  // Function to update the year (with min/max limits)
  const updateYear = (newYear) => {
    if (newYear >= startYear && newYear <= endYear) {
      setYear(newYear);
      setLayerRefresh((prev) => !prev); // 🔥 Forces layer refresh when time changes
    }
  };

  // Update Mapbox view dynamically
  const updateMapView = (newView) => {
    if (MAP_VIEWS[newView]) {
      setMapView(MAP_VIEWS[newView]);

      // Ensure the map is refreshed
      setLayerRefresh((prev) => !prev);
    }
  };

  return (
    <MapContext.Provider value={{ 
        year, 
        updateYear, 
        layers, // ✅ Store full layer details
        layerVisibility, 
        toggleLayer, 
        mapView, 
        updateMapView, 
        MAP_VIEWS,
        startYear,
        endYear,
        layerRefresh,
    }}>
      {children}
    </MapContext.Provider>
  );
};
