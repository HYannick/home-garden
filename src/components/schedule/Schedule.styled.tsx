import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { VariantProps } from '../../interfaces';
import { pulse } from '../../core/utils/animations';
import { CardProps } from './Schedule.types';


export const SkeletonCard: any = styled('div')`
  flex: 0 0 8rem;
  width: 8rem;
  height: 8rem;
  position: relative;
  margin-right: 2rem;
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.palette.grey.light};
  animation: ${pulse} 1.2s ease-in-out infinite alternate;
  &:first-of-type {
    margin-left: 2rem;
  }
`;
SkeletonCard.Chip = styled('div')`
  position: absolute;
  bottom: -1.4rem;
  right: -1rem;
  width: 3.5rem;
  height: 3.5rem;
  background: ${({ theme }) => theme.palette.grey.light};
  border-radius: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 0.5rem white;
  animation: ${pulse} 1.1s ease-in-out infinite alternate;
`;
export const Card: any = styled(NavLink)<CardProps>`
  flex: 0 0 8rem;
  width: 8rem;
  height: 8rem;
  position: relative;
  margin-right: 2rem;
  &:first-of-type {
    margin-left: 2rem;
  }
`;

Card.Media = styled('div')`
  border-radius: 2.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
Card.Chip = styled('div')<VariantProps>`
  position: absolute;
  bottom: -1.4rem;
  right: -1rem;
  width: 3.5rem;
  height: 3.5rem;
  background: ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
  border-radius: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 0.5rem white;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    > path {
      fill: none;
      stroke: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
    }
  }
  &:after {
    content: '';
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 5rem;
    margin-top: 0.2rem;
    background: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  }
`;

export const PlantWrapper = styled('div')`
  overflow-x: scroll;
  height: 10rem;
  position: relative;
  > div {
    display: flex;
    position: absolute;
    width: 100%;
  }
`;

export const PlaceHolder = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  font-size: 2rem;
  font-weight: 600;
  height: 10rem;
  margin: 0 2rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 3rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  > svg {
    width: 5rem;
    height: 5rem;
    path, circle {
      fill: ${({ theme }) => theme.palette.primary.dark};
    }
  }
`;
