import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../Styles/collapsible_graphs.scss";

const CollapsibleGraph = ({ title, data, xLabel, yLabel, xKey, yKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`collapsible-graph ${isOpen ? "expanded" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="title">{title}</span>
        <span className="symbol">{isOpen ? "-" : "+"}</span>
      </button>
      <div className="graphs">
        <div className="graph-container">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 25, right: 25, bottom: 25, left: 25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} label={{ value: xLabel, position: "insideBottom", offset: -20 }} />
              <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft", offset: -8, dy: 50 }} />
              <Tooltip />
              <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleGraph;