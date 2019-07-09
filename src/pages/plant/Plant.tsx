import React from 'react';
import styled from '@emotion/styled';
import { useGetPlant } from '../home/home.hooks';
import ActionBar from '../../layout/ActionBar';
import Edit from '../../core/svg/Edit';
import { SideLayer } from '../../layout/SideLayer';
import { VariantProps } from '../../interfaces';
import { Overlay } from '../../components/Overlay';
import Drop from '../../core/svg/Drop';
import { setVariant } from '../../components/plant-list/PlantCard';

const Name = styled('h1')<VariantProps>`
  font-weight: 600;
  font-size: 3.5rem;
  margin: 0 0 1.5rem 3rem;
  margin-left: 3rem;
  margin-bottom: 1.5rem;
  width: 20rem;
  color: ${({ theme }) => theme.palette.grey.darkest};
  position: relative;
   &:before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color:  ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 1rem;
   }
`;
const Hero = styled('div')`
  margin: 0 5rem 0 3rem;
  position: relative;
`;
const Picture = styled('div')`
  border-radius: 1.5rem 4rem 4rem 4rem;
  overflow: hidden;
  position: relative;
  height: 30rem;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WateringStatus: any = styled('div')`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -8rem;
  right: -4rem;
  z-index: 1;
`;

const Infos = styled('div')`
  margin-right: 1rem;
  text-align: right;
  > span {
    color: ${({theme}) => theme.palette.light};
    font-size: 2rem;
  }
  > h2 {
    margin: 0;
    font-size: 4rem;
    color: ${({theme}) => theme.palette.grey.dark};
    font-weight: 400;
    > span {
      font-weight: 900;
    }
  }
`;
const Button = styled('button')<VariantProps>`
  border: 1rem solid  ${({theme}) => theme.palette.light};
  border-radius: 3rem;
  width: 14rem;
  height: 14rem;
  color: ${({theme, variant}) => theme.palette[variant || 'primary'].dark};
  background-color: ${({theme, variant}) => theme.palette[variant || 'primary'].light};
  cursor: pointer;
  outline: ${({theme, variant}) => theme.palette[variant || 'primary'].dark};
  > svg {
    width: 6rem;
    height: 6rem;
    path {
      fill: none;
      stroke: ${({theme, variant}) => theme.palette[variant || 'primary'].dark};
    }
  }
`;

const Frequency = styled('span')`
  display: block;
  position: absolute;
  top: -10rem;
  right: -5rem;
  transform: rotate(90deg);
  font-size: 2rem;
  color: ${({theme}) => theme.palette.grey.medium};
`;
const Plant: React.FC = ({ match }: any) => {
  const { loading, plant, hasErrors } = useGetPlant(match.params.id);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (hasErrors) {
    return <div>Plant not found</div>;
  }

  return (
    <div>
      <ActionBar actions={[{
        key: 1,
        icon: Edit,
        onClick: () => console.log('editing ...'),
      }]}/>
      <Name variant={setVariant(plant.days_left)}>{plant.name}</Name>
      <Hero>
        <Picture>
          <Overlay color="#000" opacity={0.25}/>
          <img src={plant.picture} alt={plant.name}/>
        </Picture>
        <WateringStatus>
          <Infos>
            <span>Next Watering in</span>
            <h2><span>{plant.days_left}</span> days</h2>
          </Infos>
          <Button variant={setVariant(plant.days_left)}>
            <Drop/>
          </Button>
          <Frequency>Water every <strong>{plant.watering_frequency}</strong> days</Frequency>
        </WateringStatus>
      </Hero>
      <SideLayer variant={setVariant(plant.days_left)}/>
    </div>
  );
};

export default Plant;
