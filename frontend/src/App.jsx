import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { MapProvider } from "./context/MapContext";

function App() {
  return (
    <MapProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hello" element={<h1>Hello</h1>} />
      </Routes>
    </MapProvider>
  );
}

export default App;
