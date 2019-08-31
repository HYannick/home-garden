import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { pulse } from '../core/utils/animations';

interface SkeletonProps {
  nbRows: number
}


const SkeletonCard = styled('div')`
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.palette.grey.light};
  width: 100%;  
  position: relative;
  height: 12rem;
  margin-bottom: 4rem;
  animation: ${pulse} 1.2s ease-in-out infinite alternate;
  &:after {
    content: '';
    position: absolute;
    max-width: 15rem;
    width: 100%;
    height: 3rem;
    bottom: -2rem;
    border-radius: 5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.palette.grey.light};
    border: 0.5rem solid  ${({ theme }) => theme.palette.light};
    animation: ${pulse} 1.1s ease-in-out infinite alternate;
  }
`;


const Skeleton: React.FC<SkeletonProps> = ({ nbRows }) => (
  <Fragment>
    {
      // eslint-disable-next-line react/no-array-index-key
      [...Array(nbRows)].map((_, i) => <SkeletonCard key={i}/>)
    }
  </Fragment>
);


export default Skeleton;
