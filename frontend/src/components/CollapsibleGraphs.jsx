import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../Styles/collapsible_graphs.scss";

const CollapsibleGraph = ({ title, data, xLabel, yLabel, xKey, yKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(title);
  console.log(data);

  return (
    <div className="collapsible-graph">
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="title">{title}</span>
        <span className="symbol">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="graphs">
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey} label={{ value: xLabel, position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleGraph;