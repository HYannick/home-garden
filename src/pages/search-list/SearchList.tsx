/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import { pulse } from '../../core/utils/animations';
import { useGetDBPlantList } from '../../components/plant-list/PlantList.hooks';
import List from '../../components/forms/List';
import PlantCard from '../../components/plant-list/PlantCard';
import SearchHeader from '../../layout/SearchHeader';
import Add from '../../core/svg/Add';

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

const AddPlant: any = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
   text-decoration: none;
`;

AddPlant.Button = styled('div')`
  width: 6rem;
  height: 6rem;
  border-radius: 6rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding: 1.8rem;
  position: relative;
  transition: 0.1s;
  &:active {
    transform: translateY(0.6rem);
    &:after {
      box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.primary.dark};
    }
  }
  &:after {
    content: '';
    position: absolute;
    border-radius: 6rem;
    top:0;
    left:0;
    right:0;
    bottom:0;
    box-shadow: 0 0.6rem 0 0 ${({ theme }) => theme.palette.primary.dark};
    opacity: 0.5;
    transition: 0.1s;
  }
  svg path {
    fill: ${({ theme }) => theme.palette.primary.dark};
  }
`;

AddPlant.Tip = styled('p')`
  color: ${({ theme }) => theme.palette.primary.dark};
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`;
const sampleCover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';
const SearchList: React.FC = () => {
  const { loading: plantsLoading, plants, setSearch } = useGetDBPlantList();
  return (
    <Fragment>
      <SearchHeader onSubmit={setSearch} cover={sampleCover}/>
      <List items={plants} card={(props: any) => <PlantCard {...props} hasSearchCard path={{
        pathname: '/create',
        state: {plantInfos: props.plant}
      }}/>}/>
      {plantsLoading && <Padding><Skeleton nbRows={3}/></Padding>}
      <AddPlant to="/plant-infos-create">
        <AddPlant.Tip>
          Can't find it?<br/>
          Fill it's info!
        </AddPlant.Tip>
        <AddPlant.Button>
          <Add/>
        </AddPlant.Button>
      </AddPlant>
      <BottomSpacer/>
    </Fragment>
  );
};

export default SearchList;
