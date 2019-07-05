import React from 'react';
import { SvgTypes } from './svg-types';

const ArrowBack: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.225 21.762">
    <path d="M12.342 19.647L2.115 10.881m0 0l10.227-8.766m-8.617 9.032h18" fill={fill || '#4A4A4A'} stroke={stroke || '#4A4A4A'} strokeLinecap="round" strokeWidth="3"/>
  </svg>
);

export default ArrowBack;
