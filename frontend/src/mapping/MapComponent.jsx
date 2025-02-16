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
    center: MapInitializers.StartLocation,
    zoom: MapInitializers.StartZoom,
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

  return (
    <div style={{ width: "100%", height: "calc(100vh - 10rem)" }}>
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {mapRef.current && <MapLayers map={mapRef.current} />}
    </div>
  );
};

export default MapComponent;
