import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Wrapper = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AddPlant: any = styled(NavLink)`
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
  padding: 1rem 2rem;
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

const AddPlantButton: React.FC<{ label: string, subtitle: string, path: string }> = ({ label, subtitle, path }) => {
  return (
    <Wrapper>
      <AddPlant to={path}>
        <AddPlant.Tip>
          {subtitle}
        </AddPlant.Tip>
        <AddPlant.Button>
          <span>{label}</span>
        </AddPlant.Button>
      </AddPlant>
    </Wrapper>
  );
};

export default AddPlantButton;
