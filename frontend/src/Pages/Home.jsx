import MainContainer from "../components/MainContainer.jsx";
import React, { useEffect, useState } from "react";
import "../Styles/root_local.scss";
import MapComponent from "../mapping/MapComponent.jsx";
import Header from "../components/Header.jsx";
import TopRowContainer from "../components/TopRowContainer.jsx";
import OverlaySelectionContainer from "../components/OverlaySelectionContainer.jsx";
import BottomRowContainer from "../components/BottomRowContainer.jsx";
import GraphingContainer from "../components/GraphingContainer.jsx";
import DateSlider from "../components/DateSlider.jsx";
import CollapsibleGraph from "../components/CollapsibleGraphs.jsx";

function Root() {
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
          <CollapsibleGraph title={"Lil wayne"}></CollapsibleGraph>
          <CollapsibleGraph title={"Is"}></CollapsibleGraph>
          <CollapsibleGraph title={"Tha Best"}></CollapsibleGraph>
        </BottomRowContainer>
      </MainContainer>
    </div>
  );
}

export default Root;
