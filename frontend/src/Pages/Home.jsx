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
              const dataModule = await import(`/public/graph_data/${layerId}.js`); // Why import no work
              if (Array.isArray(dataModule.default) && dataModule.default.length > 0) {
                newGraphData[layerId] = dataModule.default[0];
              }
            } catch (error) {
              console.error(`Failed to load graph data for ${layerId}:`, error);
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
          {Object.values(layerVisibility).some(isVisible => isVisible) ? (
            Object.entries(layerVisibility).map(([layerId, isVisible]) =>
              isVisible && graphData[layerId] ? (
                <CollapsibleGraph
                  key={layerId}
                  title={layerId}
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

