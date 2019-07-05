import React from 'react';
import { SvgTypes } from './svg-types';

const ArrowLeft: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.283 15.614">
    <g fill={fill} stroke={stroke} strokeLinecap="round" strokeWidth="2">
      <path d="M1.41 1.41l7.463 6.397M8.873 7.807L1.41 14.204"/>
    </g>
  </svg>
);

export default ArrowLeft;
