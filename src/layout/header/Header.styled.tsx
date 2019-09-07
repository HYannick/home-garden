import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';


export const Avatar = styled(NavLink)`
  border-radius: 2.5rem;
  width: 8rem;
  height: 8rem;
  border: 0.5rem solid ${({ theme }) => theme.palette.light};
  position: absolute;
  right: 1.5rem;
  bottom: -4rem;
  overflow: hidden;
`;

export const HeaderWrapper = styled('div')`
  position: relative;
  height: 8rem;
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
`;

export const HeaderContainer = styled('div')`
  position: absolute;
  overflow: hidden;
  border-radius: 0 0 4.5rem 4.5rem;
  top: 0;
  left:0;
  bottom:0;
  right:0;
  z-index: -1;
`;
