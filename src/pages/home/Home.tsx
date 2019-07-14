/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
// @ts-ignore
import defaultAvatar from '../../static/default-avatar.jpeg';
import Header from '../../layout/Header';
import PlantList from '../../components/plant-list/PlantList';
import Feed from '../../components/Feed';
import { useGetUserInfos } from './home.hooks';
import Schedule from '../../components/Schedule';


const sampleCover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';
const Overflow = styled('div')`
  overflow-y: scroll;
  height: 99vh; 
`;
const Spacer = styled('div')`
  height: 10rem;
`;
const HomeScreen: React.FC = () => {
  const { loading, userInfos } = useGetUserInfos();
  if (loading) {
    return <div>Loading content...</div>;
  }
  return (
    <Overflow>
      <Header avatarUrl={userInfos.avatar || defaultAvatar} username={userInfos.username} cover={sampleCover}/>
      <Schedule />
      <Feed/>
      <PlantList/>
      <Spacer/>
    </Overflow>
  );
};

export default HomeScreen;
