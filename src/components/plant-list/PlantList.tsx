/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Heading from '../../layout/Heading';
import { pulse } from '../../core/utils/animations';
import List from '../List';
import PlantCard from './plant-card/PlantCard';
import { useGetPlantList } from './PlantList.hooks';

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

const Spacer = styled('div')`
  padding: 0 2rem;
`;

const ViewMore = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 2rem 3rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  margin: 2rem;
  border-radius: 1rem 1rem 5rem 5rem;
  font-size: 1.6rem;
  border: 0.2rem solid ${({ theme }) => theme.palette.primary.dark};
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
    color: ${({ theme }) => theme.palette.primary.light};
  } 
`;

const PlantList: React.FC = () => {
  const { loading: plantsLoading, plants, warning } = useGetPlantList({onlyHealthy: false, range: [0, 4]});
  const { t } = useTranslation();

  return (
    <Fragment>
      <div css={css`
          padding: 2rem 3.5rem 0;
      `}>
        <Heading
          variant="warning" title="Your Plants"
          subtitle={warning !== 0 ? t('needy_plants.needy', { count: warning }) : t('needy_plants.all_set')}/>
      </div>
      <List items={plants} card={(props: any) => <PlantCard {...props} t={t} path={`/plants/${props.plant.id}`} />}/>
      {plantsLoading && <Spacer><Skeleton nbRows={3}/></Spacer>}
      <ViewMore to="/plants">View all plants</ViewMore>
    </Fragment>
  );
};

export default PlantList;
