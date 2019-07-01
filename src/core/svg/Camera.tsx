import React from 'react';
import {SvgTypes} from "./svg-types";

const Camera: React.FC<SvgTypes> = ({fill, stroke}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 22"><g transform="translate(-1 -5)" fill={fill} stroke={stroke}><rect width="4" height="2" rx="1" transform="translate(12 8.17)"/><path d="M28.84 27H3.16A2.16 2.16 0 0 1 1 24.84V7.16A2.16 2.16 0 0 1 3.16 5h25.68A2.16 2.16 0 0 1 31 7.16v17.68A2.16 2.16 0 0 1 28.84 27zM3.16 7a.16.16 0 0 0-.16.16v17.68a.16.16 0 0 0 .16.16h25.68a.16.16 0 0 0 .16-.16V7.16a.16.16 0 0 0-.16-.16z"/><path d="M21 22a6 6 0 1 1 6-6 6 6 0 0 1-6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0-4-4zM8.31 6h2v20h-2z"/></g></svg>
);

export default Camera;
