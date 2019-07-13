/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useGetPlantList } from '../../pages/home/home.hooks';
import Heading from '../../layout/Heading';
import { pulse } from '../../core/utils/animations';
import PlantCard from './PlantCard';
import { useTranslation } from 'react-i18next';

const List = styled('div')`
  padding: 2rem 2rem;
`;

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

export const renderMessage = (t: any, warning: number) => {
  if (warning >= 2) return `${warning} plants need your attention`;
  if (warning === 1) return `${warning} plant need your attention`;
  return 'You are all set ! :D';
};

const PlantList: React.FC = () => {
  const { loading: plantsLoading, plants, warning } = useGetPlantList();
  const {t} = useTranslation();
  return (
    <Fragment>
      <div css={css`
          padding: 2rem 3.5rem 0;
      `}>
        <Heading variant="warning" title="Your schedule" subtitle={renderMessage(t, warning)}/>
      </div>
      <List>
        {plantsLoading ? (
          <Skeleton data-testid="skeleton" nbRows={4}/>
        ) : (
          plants.map(plant => (
            <PlantCard key={plant.id} plant={plant}/>
          ))
        )}
      </List>
    </Fragment>
  );
};

export default PlantList;
