import NavBar from "../Componets/NavBar.jsx";
import MainContainer from "../Componets/MainContainer.jsx";
import React, { useEffect, useState } from "react";
import "../Styles/root_local.scss";
import MapInteraction from "../Componets/MapInteraction.jsx";
import Header from "../Componets/Header.jsx";

function Root() {
  return (
    <div className="bg-gray-900">
      <Header />
      <MainContainer>
        <MapInteraction />
      </MainContainer>
    </div>
  );
}

export default Root;
