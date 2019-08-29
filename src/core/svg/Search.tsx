import React from 'react';
import { SvgTypes } from './svg-types';

const SearchIcon: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.837 23.837"><path d="M14 14l8.335 8.335zM1.5 8.792a7.293 7.293 0 1 1 7.292 7.293A7.292 7.292 0 0 1 1.5 8.792z" fill={fill} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></svg>
);

export default SearchIcon;
