import React from 'react';
import { useGetPlantList } from '../../pages/home/home.hooks';
import PlantCard from './PlantCard';
import styled from '@emotion/styled';

const List = styled('div')`
  padding: 2rem 2rem 10rem;
`;

const PlantList: React.FC = () => {
  const { loading: plantsLoading, plants } = useGetPlantList();
  return (
    <List>
      {plantsLoading ? (
        <div>Loading</div>
      ) : (
        plants.map(plant => (
          <PlantCard plant={plant} />
        ))
      )}
    </List>
  );
};

export default PlantList;
