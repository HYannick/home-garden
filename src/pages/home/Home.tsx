/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Header from '../../layout/header/Header';
import PlantList from '../../components/plant-list/PlantList';
import Feed from '../../components/feed/Feed';
import Schedule from '../../components/schedule/Schedule';

const Overflow = styled('div')`
  overflow-y: scroll;
  height: 100vh; 
`;
const Spacer = styled('div')`
  height: 10rem;
`;
const HomeScreen: React.FC = () => {
  return (
    <Overflow>
      <Header />
      <Schedule />
      <Feed/>
      <PlantList/>
      <Spacer/>
    </Overflow>
  );
};

export default HomeScreen;
