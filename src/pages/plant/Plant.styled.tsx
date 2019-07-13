import styled from '@emotion/styled';
import { VariantProps } from '../../interfaces';

export const Name = styled('h1')<VariantProps>`
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
export const Hero = styled('div')`
  margin: 0 5rem 10rem 3rem;
  position: relative;
`;
export const Picture = styled('div')`
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
export const WateringStatus: any = styled('div')`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -8.2rem;
  right: -4rem;
  z-index: 1;
`;
export const Infos = styled('div')`
  margin-right: 1rem;
  text-align: right;
  > span {
    color: ${({ theme }) => theme.palette.light};
    font-size: 2rem;
  }
  > h2 {
    margin: 0;
    font-size: 4rem;
    color: ${({ theme }) => theme.palette.grey.dark};
    font-weight: 400;
    > span {
      font-weight: 900;
    }
  }
`;
export const Button = styled('div')<VariantProps>`
  background-color: ${({ theme }) => theme.palette.light};
  border-radius: 4rem;
  width: 15rem;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    width: 12rem;
    height: 12rem;
    border-radius: 3rem;
    border: none;
    color: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
    background-color: ${({ theme, variant }) => theme.palette[variant || 'primary'].light};
    cursor: pointer;
    outline: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
    position: relative;
    transition: 0.1s;
    &:active {
     transform: translateY(6px);
     &:after {
       box-shadow: 0 0 0px 0px ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
     }
    }
    &:after {
      content: '';
      position: absolute;
      border-radius: 3rem;
      top:0;
      left:0;
      right:0;
      bottom:0;
      box-shadow: 0 6px 0 0 ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
      opacity: 0.5;
      transition: 0.1s;
    }
    > svg {
      width: 6rem;
      height: 6rem;
      path {
        fill: none;
        stroke: ${({ theme, variant }) => theme.palette[variant || 'primary'].dark};
      }
    }
  }
`;
export const Frequency = styled('span')`
  display: block;
  position: absolute;
  top: -10rem;
  right: -5rem;
  transform: rotate(90deg);
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.grey.medium};
`;
export const PlantInfos = styled('div')``;
export const Description = styled('div')``;
export const GeneralStats = styled('div')``;
export const MoistureSensorStats = styled('div')``;
export const Advices = styled('div')``;
export const PlaceHolder = styled('div')`
  margin: 6rem 2rem 0rem 6rem;
  text-align: center;
  > svg {
    width: 4rem;
    height: 4rem;
    path {
      fill: ${({ theme }) => theme.palette.grey.light};
    }
  }
  > h2 {
    text-align: center;
    margin: 0;
    color: ${({ theme }) => theme.palette.grey.light}
  }
`;
