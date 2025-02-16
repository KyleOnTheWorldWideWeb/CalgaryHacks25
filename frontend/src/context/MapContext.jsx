import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const MapContext = createContext();

// Custom Hook for easier access
export const useMapContext = () => useContext(MapContext);

// Provider Component
export const MapProvider = ({ children }) => {
  // State for the current year (1950-2010)
  const [year, setYear] = useState(1950);

  // State for layer visibility (dynamically set from JSON)
  const [layerVisibility, setLayerVisibility] = useState({});

  // Load layer data from layerConfig.json on mount
  useEffect(() => {
    fetch("/config/layerConfig.json") // Ensure correct path
      .then((response) => response.json())
      .then((data) => {
        // Initialize visibility state dynamically
        const initialVisibility = data.reduce((acc, layer) => {
          acc[layer.id] = layer.visible ?? true; // Default to true if missing
          return acc;
        }, {});
        setLayerVisibility(initialVisibility);
      })
      .catch((error) => console.error("Error loading layer config:", error));
  }, []);

  // Function to toggle layer visibility
  const toggleLayer = (layerId) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  // Function to update the year (with min/max limits)
  const updateYear = (newYear) => {
    if (newYear >= 1950 && newYear <= 2010) {
      setYear(newYear);
    }
  };

  return (
    <MapContext.Provider value={{ year, updateYear, layerVisibility, toggleLayer }}>
      {children}
    </MapContext.Provider>
  );
};
