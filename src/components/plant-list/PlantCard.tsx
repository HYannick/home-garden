import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Drop from '../../core/svg/Drop';

const Card: any = styled(NavLink)`
  display: block;
  position: relative;
  margin-bottom: 4rem;
`;

Card.Picture = styled('div')`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  height: 12rem;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

Card.Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.grey.darkest};
  opacity: 0.65;
`;

Card.Infos = styled('div')`
  position: absolute;
  bottom: -2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > p {
    color: ${({ theme }) => theme.palette.light};
    margin: 0 0 1rem;
    font-size: 2rem;
    font-weight: 600;
  }
`;

// eslint-disable-next-line no-undef
Card.Chip = styled('div')<{ variant: string }>`
  display: flex;
  border: 0.4rem solid ${({ theme }) => theme.palette.light};
  background-color: ${({ theme, variant }) => theme.palette[variant || 'primary'].light};
  padding: 1rem 2rem;
  border-radius: 5rem;
  > span {
    color: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
    margin-right: 1rem;
  }
  > svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: none;
      stroke: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark}
    }
  }
`;

export const setVariant = (days_left: number) => {
  let variant = 'primary';
  if(days_left < 3) {
    variant = 'warning';
  }

  if(days_left === 0) {
    variant = 'danger';
  }
  return variant;
};

const PlantCard: React.FC<any> = ({ plant }) => {

  return (
    <Card to={`/plants/${plant.id}`}>
      <Card.Picture>
        <img src={plant.picture} alt={plant.name}/>
        <Card.Overlay/>
      </Card.Picture>
      <Card.Infos>
        <p>{plant.name}</p>
        <Card.Chip variant={setVariant(plant.days_left)}>
          <span>Next Watering in {plant.days_left} days</span>
          <Drop/>
        </Card.Chip>
      </Card.Infos>
    </Card>
  );
};

export default PlantCard;
