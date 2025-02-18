import React, { useEffect, useState } from 'react';
import '../Styles/bottom_row_container.scss';

const BottomRowContainer = ({ children, id }) => {
  return <div className="bottom-row-container" id={id}>{children}</div>;
};

export default BottomRowContainer;