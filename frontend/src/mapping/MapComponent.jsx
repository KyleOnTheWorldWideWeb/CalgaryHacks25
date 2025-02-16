import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapContext } from "../context/MapContext";
import MapLayers from "./MapLayers";
import { MapInitializers } from "../context/MapData";

const MapComponent = () => {
  const { mapView } = useMapContext();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  // Store map position (center & zoom)
  const [mapState, setMapState] = useState({
    center: [-113, 54.5], // Default center (Alberta)
    zoom: 5,
  });

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapView, // Controlled by context
      center: mapState.center, // Preserve last known center
      zoom: mapState.zoom, // Preserve last known zoom
    });

    mapRef.current = map;

    // Store map position when user moves it
    map.on("moveend", () => {
      setMapState({
        center: map.getCenter().toArray(),
        zoom: map.getZoom(),
      });
    });

    return () => map.remove();
  }, [mapView]); // Re-initialize map if view changes

  const recenterMap = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [-113, 54.5], // Coordinates for Alberta
        zoom: 5,
        essential: true // This animation is considered essential with respect to prefers-reduced-motion
      });
    }
  };

  return (
    <div className="w-full h-[calc(100vh-7rem)] relative rounded-lg">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full rounded-lg" />
      <button onClick={recenterMap} className="absolute top-2.5 right-2.5 z-10 p-2.5 rounded-lg bg-white text-black shadow-md cursor-pointer">
        Center Map
      </button>
      {mapRef.current && <MapLayers map={mapRef.current} />}
    </div>
  );
};

export default MapComponent;