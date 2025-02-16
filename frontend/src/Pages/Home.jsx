import NavBar from "../Componets/NavBar.jsx";
import MainContainer from "../Componets/MainContainer.jsx";
import React, { useEffect, useState } from "react";
import "../Styles/root_local.scss";
import MapComponent from "../mapping/MapComponent.jsx";
import Header from "../Componets/Header.jsx";
import TopRowContainer from "../Componets/TopRowContainer.jsx";
import OverlaySelectionContainer from "../Componets/OverlaySelectionContainer.jsx";
import BottomRowContainer from "../Componets/BottomRowContainer.jsx";
import GraphingContainer from "../Componets/GraphingContainer.jsx";
import DateSlider from "../Componets/DateSlider.jsx";

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
          <GraphingContainer />
        </BottomRowContainer>
      </MainContainer>
    </div>
  );
}

export default Root;
