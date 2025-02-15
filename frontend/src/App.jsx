import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="hello" element={<h1>Hello</h1>} />
    </Routes>
  );
}

export default App;
