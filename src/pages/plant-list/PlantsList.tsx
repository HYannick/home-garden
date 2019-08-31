/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useGetPlantList } from '../../components/plant-list/PlantList.hooks';
import List from '../../components/List';
import PlantCard from '../../components/plant-list/plant-card/PlantCard';
import SearchHeader from '../../layout/SearchHeader';
import Skeleton from '../../components/Skeleton';

const Padding = styled('div')`
  padding: 0 2rem;
`;
const BottomSpacer = styled('div')`
  height: 8rem;
`;

const sampleCover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';
const PlantsList: React.FC = () => {
  const { loading: plantsLoading, plants, setSearch } = useGetPlantList({});
  const {t} = useTranslation();
  return (
    <Fragment>
      <SearchHeader onSubmit={setSearch} cover={sampleCover}/>
      <List items={plants} card={(props: any) => <PlantCard {...props} t={t} path={`/plants/${props.plant.id}`} />}/>
      {plantsLoading && <Padding><Skeleton nbRows={3}/></Padding>}
      <BottomSpacer/>
    </Fragment>
  );
};

export default PlantsList;
