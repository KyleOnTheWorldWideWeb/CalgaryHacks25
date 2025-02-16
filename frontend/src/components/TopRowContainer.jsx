import React, { useEffect, useState } from 'react';
import '../Styles/top_row_container.scss';

const TopRowContainer = ({ children, id }) => {
  return <div className="top-row-container rounded-lg" id={id}>{children}</div>;
};

export default TopRowContainer;