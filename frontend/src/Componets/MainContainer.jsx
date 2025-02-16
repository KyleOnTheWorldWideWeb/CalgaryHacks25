import React, { useEffect, useState } from 'react';
import '../Styles/main_container.scss';

const MainContainer = ({ children, id }) => {
  return <div className="main-container" id={id}>{children}</div>;
};

export default MainContainer;
