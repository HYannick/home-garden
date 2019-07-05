import React from 'react';
import { SvgTypes } from './svg-types';

const ArrowRight: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.283 15.614">
    <g fill={fill} stroke={stroke} strokeLinecap="round" strokeWidth="2">
      <path d="M8.873 14.204L1.41 7.807M1.41 7.807L8.873 1.41"/>
    </g>
  </svg>
);

export default ArrowRight;
