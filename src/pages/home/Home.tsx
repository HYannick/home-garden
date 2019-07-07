/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
// @ts-ignore
import defaultAvatar from '../../static/default-avatar.jpeg';
import Header from '../../layout/Header';
import PlantList from '../../components/plant-list/PlantList';
import { useGetUserInfos } from './home.hooks';


const sampleCover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';

const HomeScreen: React.FC = () => {
  const { loading, userInfos } = useGetUserInfos();
  if (loading) {
    return <div>Loading content...</div>;
  }
  return (
    <div>
      <Header avatarUrl={userInfos.avatar || defaultAvatar} username={userInfos.username} cover={sampleCover}/>
      <PlantList/>
    </div>
  );
};

export default HomeScreen;
