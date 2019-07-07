import React from 'react';
import { SvgTypes } from './svg-types';

const Home: React.FC<SvgTypes> = ({ fill, stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.613 14.472"><path d="M1 5.957L6.777 1l5.835 4.957v7.515H1z" fill={fill} stroke={stroke} strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default Home;
