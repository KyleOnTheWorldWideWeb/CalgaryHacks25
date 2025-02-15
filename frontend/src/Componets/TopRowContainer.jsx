import React, { useEffect, useState } from 'react';
import '../styles/top_row_container.scss';

const TopRowContainer = ({ children, id }) => {
  return <div className="top-row-container" id={id}>{children}</div>;
};

export default TopRowContainer;