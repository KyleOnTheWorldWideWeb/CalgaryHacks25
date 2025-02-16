import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../Styles/collapsible_graphs.scss";

const sampleData = [
  { time: "2020", population: 100 },
  { time: "2021", population: 120 },
  { time: "2022", population: 140 },
  { time: "2023", population: 160 },
];

const CollapsibleGraph = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-graph">
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <span class="title">{title}</span>
        <span class="symbol">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="graphs">
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="population" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleGraph;