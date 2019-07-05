import React from 'react';
import { SvgTypes } from './svg-types';

const Edit: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.926 21.532">
    <path
      d="M21.154 19.989H.772a.772.772 0 0 0 0 1.543h20.382a.772.772 0 0 0 0-1.543zM.032 13.237L0 16.875a.705.705 0 0 0 .225.547.912.912 0 0 0 .547.225l3.633-.032a.912.912 0 0 0 .547-.225L17.425 4.911a.8.8 0 0 0 0-1.093l-3.6-3.6a.8.8 0 0 0-1.093 0l-2.509 2.507-9.966 9.966a.753.753 0 0 0-.225.546zm15.753-8.873l-1.414 1.411-2.508-2.5 1.415-1.415zm-14.21 9.195l9.195-9.195 2.508 2.511-9.195 9.195H1.575z"
      fill={fill} stroke={stroke}/>
  </svg>
);

export default Edit;
