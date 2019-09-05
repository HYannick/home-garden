import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { VariantProps } from '../../interfaces';

export const ProfileHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Username = styled('div')`
  background-color:  ${({ theme }) => theme.palette.light};
  border-radius: 2rem 0 0 4rem;
  padding: 0 2rem;
  max-width: 15rem;
  h2 {
    font-size: 3rem;
    font-weight: bold;
    color:  ${({ theme }) => theme.palette.grey.dark};
  }
`;
export const Avatar = styled('div')`
  width: 28rem;
  height: 28rem;
  border-radius: 4rem;
  overflow: hidden;
`;
export const UserDetails = styled('div')``;

export const Counters: any = styled('div')`
  display: flex;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border-radius: 4rem;
`;

Counters.Block = styled('div')<VariantProps>`
  flex: 1;
  color: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  text-align: center;
  p {
  font-size: 4.5rem;
  margin: 0 0 1rem;
  font-weight: 900;
  }
  span {
  font-size: 1.4rem;
  opacity: 0.7;
  }
`;

export const Spacer = styled('h4')`
  height: 10rem;
`;

export const Padding = styled('div')`
  padding: 0 2rem;
`;

export const ChartContainer = styled('div')`
  max-width: 20rem;
  margin: 0 auto;
  width: 100%;
  > div {
    position: relative;
    display: flex;
  }
`;

export const TotalCount = styled('div')`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h4 {
    font-size:  5rem;
    margin: 0;
    color: ${({ theme }) => theme.palette.grey.darker};
  }
  span {
     color: ${({ theme }) => theme.palette.grey.dark};
  }
`;

export const ViewAll = styled(NavLink)`
  display: flex;
  width: 70%;
  margin: 1rem auto 0;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 2rem 2rem 4rem 4rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  padding: 1rem 1.5rem;
  text-decoration: none;
  font-weight: bold;
`;
