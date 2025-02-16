import MainContainer from "../components/MainContainer.jsx";
import React, { useEffect, useState } from "react";
import "../Styles/root_local.scss";
import MapComponent from "../mapping/MapComponent.jsx";
import Header from "../components/Header.jsx";
import TopRowContainer from "../components/TopRowContainer.jsx";
import OverlaySelectionContainer from "../components/OverlaySelectionContainer.jsx";
import BottomRowContainer from "../components/BottomRowContainer.jsx";
import DateSlider from "../components/DateSlider.jsx";
import CollapsibleGraph from "../components/CollapsibleGraphs.jsx";
import { useMapContext } from "../context/MapContext";

function Root() {
  const { layerVisibility } = useMapContext();

  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const loadGraphData = async () => {
      const newGraphData = {};
      await Promise.all(
        Object.entries(layerVisibility).map(async ([layerId, isVisible]) => {
          if (isVisible) {
            try {
              const response = await fetch(`/graph_data/${layerId}.js`);
              if (response.ok) {
                const dataModule = await response.json();
                if (Array.isArray(dataModule) && dataModule.length > 0) {
                  newGraphData[layerId] = dataModule[0];
                }
              } else {
                console.error(`Failed to load graph data for ${layerId}:`, response.statusText);
              }
            } catch (error) {
              console.error(`Error fetching graph data for ${layerId}:`, error);
            }
          }
        })
      );
      setGraphData(newGraphData);
    };

    loadGraphData();
  }, [layerVisibility]);

  return (
    <div className="bg-gray-900">
      <Header />
      <MainContainer>
        <TopRowContainer>
          <OverlaySelectionContainer />
          <MapComponent />
        </TopRowContainer>
        <DateSlider startDate="1900-01-01" endDate="2024-02-16" />
        <BottomRowContainer>
          <h3 className="summaries-title">Summaries</h3>
          {Object.values(layerVisibility).some(isVisible => isVisible) ? (
            Object.entries(layerVisibility).map(([layerId, isVisible]) =>
              isVisible && graphData[layerId] ? (
                <CollapsibleGraph
                  key={layerId}
                  title={graphData[layerId].title}
                  data={graphData[layerId].xValues.map((x, index) => ({
                    [graphData[layerId].xKey]: x,
                    [graphData[layerId].yKey]: graphData[layerId].yValues[index],
                  }))}
                  xLabel={graphData[layerId].xLabel}
                  yLabel={graphData[layerId].yLabel}
                  xKey={graphData[layerId].xKey}
                  yKey={graphData[layerId].yKey}
                />
              ) : null
            )
          ) : (
            <p>Switch a toggle to display additional information</p>
          )}
        </BottomRowContainer>
      </MainContainer>
    </div>
  );
}

export default Root;

