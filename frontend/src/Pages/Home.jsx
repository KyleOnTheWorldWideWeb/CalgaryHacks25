import NavBar from '../Components/NavBar.jsx';
import MainContainer from '../Components/MainContainer.jsx';
import React, { useEffect, useState } from 'react';
import '../Styles/root_local.scss';
import MapInteraction from "../Components/MapInteraction";

function Root () {
  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <MapInteraction />
      </MainContainer>
    </>
  );
}

export default Root;