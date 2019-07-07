/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useGetPlantList } from '../../pages/home/home.hooks';
import Heading from '../../layout/Heading';
import PlantCard from './PlantCard';

const List = styled('div')`
  padding: 2rem 2rem 10rem;
`;

const PlantList: React.FC = () => {
  const { loading: plantsLoading, plants } = useGetPlantList();
  return (
    <Fragment>
      <div css={css`
          padding: 2rem 3.5rem 0;
      `}>
        <Heading variant="warning" title="Your schedule" subtitle="3 plants need your attention"/>
      </div>
      <List>
        {plantsLoading ? (
          <div>Loading</div>
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
