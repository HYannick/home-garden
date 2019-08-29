/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { pulse } from '../../core/utils/animations';
import { useGetPlantList } from '../../components/plant-list/PlantList.hooks';
import List from '../../components/forms/List';
import PlantCard from '../../components/plant-list/PlantCard';
import SearchHeader from '../../layout/SearchHeader';

interface SkeletonProps {
  nbRows: number
}

const Skeleton: React.FC<SkeletonProps> = ({ nbRows }) => {
  const SkeletonCard = styled('div')`
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.palette.grey.light};
  width: 100%;  
  position: relative;
  height: 12rem;
  margin-bottom: 4rem;
  animation: ${pulse} 1.2s ease-in-out infinite alternate;
  &:after {
    content: '';
    position: absolute;
    max-width: 15rem;
    width: 100%;
    height: 3rem;
    bottom: -2rem;
    border-radius: 5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.palette.grey.light};
    border: 0.5rem solid  ${({ theme }) => theme.palette.light};
    animation: ${pulse} 1.1s ease-in-out infinite alternate;
  }
`;

  return (
    <Fragment>
      {
        // eslint-disable-next-line react/no-array-index-key
        [...Array(nbRows)].map((_, i) => <SkeletonCard key={i}/>)
      }
    </Fragment>
  );
};

const Padding = styled('div')`
  padding: 0 2rem;
`;
const BottomSpacer = styled('div')`
  height: 8rem;
`;
const sampleCover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';
const PlantsList: React.FC = () => {
  const { loading: plantsLoading, plants, setSearch } = useGetPlantList({});
  return (
    <Fragment>
      <SearchHeader onSubmit={setSearch} cover={sampleCover}/>
      <List items={plants} card={(props: any) => <PlantCard {...props} path={`/plants/${props.plant.id}`} />}/>
      {plantsLoading && <Padding><Skeleton nbRows={3}/></Padding>}
      <BottomSpacer/>
    </Fragment>
  );
};

export default PlantsList;
