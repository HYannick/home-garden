import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Padding = styled('div')`
  padding: 0 2rem;
`;
export const BottomSpacer = styled('div')`
  height: 8rem;
`;
export const AddPlant: any = styled(NavLink)`
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
