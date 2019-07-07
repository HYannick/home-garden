/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
// @ts-ignore
import defaultAvatar from '../../static/default-avatar.jpeg';
import Header from '../../layout/Header';
import Schedule from '../../components/Schedule';
import { plantStore } from '../../api/plants.api';
import { useGetPlantList, useGetUserInfos } from './home.hooks';
import PlantList from '../../components/plant-list/PlantList';


const sampleCover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';

const HomeScreen: React.FC = () => {
  const { loading, userInfos } = useGetUserInfos();
  const { loading: plantsLoading, plants } = useGetPlantList();

  if (loading) {
    return <div>Loading content...</div>;
  }
  return (
    <div>
      <Header avatarUrl={userInfos.avatar || defaultAvatar} username={userInfos.username} cover={sampleCover}/>
      <Schedule/>
      <PlantList />
    </div>
  );
};

export default HomeScreen;
