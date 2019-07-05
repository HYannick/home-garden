import React from 'react';
import { SvgTypes } from './svg-types';

const Drop: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.214 17">
    <path
      d="M6.944 1s6.27 6.2 6.27 9.329A5.9 5.9 0 0 1 7.107 16 5.9 5.9 0 0 1 1 10.329C1 7.193 6.944 1 6.944 1z"
      fill={fill || '#707070'} stroke={stroke || '#707070'} strokeLinecap="round" strokeLinejoin="round"
      strokeWidth="2"/>
  </svg>
);

export default Drop;
