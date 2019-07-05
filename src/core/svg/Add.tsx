import React from 'react';
import { SvgTypes } from './svg-types';

const Add: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.999 14.999">
    <path
      d="M6.328 13.828V8.672H1.172a1.172 1.172 0 0 1 0-2.344h5.156V1.172a1.172 1.172 0 0 1 2.344 0v5.156h5.156a1.172 1.172 0 0 1 0 2.344H8.672v5.156a1.172 1.172 0 0 1-2.344 0z"
      fill={fill} stroke={stroke}/>
  </svg>
);

export default Add;
