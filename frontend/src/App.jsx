import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MapInteraction from "./components/MapInteraction";

function App() {
  return (
    <Routes>
      <Route path="WildChanging" element={<MapInteraction />} />
      <Route path="/" element={<h1>Hello</h1>} />
    </Routes>
  );
}

export default App;
