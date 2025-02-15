import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [-114.0719, 51.0447], // Calgary
      zoom: 9,
    });

    mapRef.current = map;

    // Add a marker for reference
    new mapboxgl.Marker()
      .setLngLat([-114.0719, 51.0447])
      .setPopup(new mapboxgl.Popup().setHTML("<b>Hello, Mapbox!</b>"))
      .addTo(map);

    // Load the GeoJSON layers on map load
    map.on("load", () => {
      // Caribou Habitat Layer
      map.addSource("caribou-range", {
        type: "geojson",
        data: "/data/Caribou_Range.geojson",
      });

      map.addLayer({
        id: "caribou-layer",
        type: "fill",
        source: "caribou-range",
        paint: {
          "fill-color": "#008000", // Green for forest/nature
          "fill-opacity": 0.5,
          "fill-outline-color": "#004d00",
        },
      });

      // Grizzly Bear Habitat Layer
      map.addSource("grizzly-habitat", {
        type: "geojson",
        data: "/data/Merged_Grizzly_Bear_Habitat.geojson",
      });

      map.addLayer({
        id: "grizzly-layer",
        type: "fill",
        source: "grizzly-habitat",
        paint: {
          "fill-color": "#8B4513", // Brown for bear habitat
          "fill-opacity": 0.6,
          "fill-outline-color": "#5C3317",
        },
      });
    });

    return () => map.remove();
  }, [mapStyle]);

  const toggleMapStyle = () => {
    setMapStyle((prevStyle) =>
      prevStyle === "mapbox://styles/mapbox/streets-v12"
        ? "mapbox://styles/mapbox/outdoors-v12"
        : "mapbox://styles/mapbox/streets-v12"
    );
  };



  

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <button
        onClick={toggleMapStyle}
        className="absolute top-4 left-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Toggle Map Style
      </button>
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default MapComponent;
