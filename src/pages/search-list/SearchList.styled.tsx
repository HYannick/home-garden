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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 6rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.primary.dark};
  padding: 1.5rem 2rem;
  > span {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.primary.dark};
  }
  > div {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
     svg path {
      fill: ${({ theme }) => theme.palette.primary.dark};
    }
  }
 
`;
AddPlant.Tip = styled('p')`
  color: ${({ theme }) => theme.palette.grey.dark};
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  white-space: pre-line;
`;
