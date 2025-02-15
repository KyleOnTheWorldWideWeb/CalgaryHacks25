import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="WildChanging" element={<Home />} />
      <Route path="/" element={<h1>Hello</h1>} />
    </Routes>
  );
}

export default App;
