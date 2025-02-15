import NavBar from "../Componets/NavBar.jsx";
import MainContainer from "../Componets/MainContainer.jsx";
import React, { useEffect, useState } from "react";
import "../Styles/root_local.scss";
import MapInteraction from "../Componets/MapInteraction.jsx";
import Header from "../Componets/Header.jsx";
import TopRowContainer from "../Componets/TopRowContainer.jsx";
import OverlaySelectionContainer from "../Componets/OverlaySelectionContainer.jsx";

function Root() {
  return (
    <div className="bg-gray-900">
      <Header />
      <MainContainer>
        <TopRowContainer><OverlaySelectionContainer></OverlaySelectionContainer><MapInteraction /></TopRowContainer>
      </MainContainer>
    </div>
  );
}

export default Root;
