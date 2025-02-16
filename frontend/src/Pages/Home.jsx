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

function Root() {
  const sampleData = [
    { time: "2020", population: 100 },
    { time: "2021", population: 120 },
    { time: "2022", population: 140 },
    { time: "2023", population: 160 },
  ];
  return (
    <div className="bg-gray-900">
      <Header />
      <MainContainer>
        <TopRowContainer>
          <OverlaySelectionContainer></OverlaySelectionContainer>
          <MapComponent />
        </TopRowContainer>
        <DateSlider startDate="1900-01-01" endDate="2024-02-16" />
        <BottomRowContainer>
          <CollapsibleGraph title={"Leel Wayne"} data={sampleData} xLabel={"Time"} yLabel={"Population"} xKey={"time"} yKey={"population"}></CollapsibleGraph>
          <CollapsibleGraph title={"Is"} data={sampleData} xLabel={"Time"} yLabel={"Population"} xKey={"time"} yKey={"population"}></CollapsibleGraph>
          <CollapsibleGraph title={"Tha Best"} data={sampleData} xLabel={"Time"} yLabel={"Population"} xKey={"time"} yKey={"population"}></CollapsibleGraph>
        </BottomRowContainer>
      </MainContainer>
    </div>
  );
}

export default Root;
