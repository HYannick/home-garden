/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Heading from '../layout/Heading';
import Typography from './Typography';

interface CardProps {
  key: string,
  imgUrl: string
}

const Card = styled('div')<CardProps>`
  
`;

const PlaceHolder = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 1rem 0 0 1rem;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  padding: 2rem;
  border: 0.1rem dotted ${({ theme }) => theme.palette.primary.dark};
  
  & p {
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 1.7rem;
  }
`;

const PlantWrapper = styled('div')`
  overflow-x: scroll;
`;


interface PlantProps {
  id: string,
  imgUrl: string
}

const Schedule: React.FC = () => {
  const [plants] = useState([]);

  useEffect(() => {

  }, [plants]);
  return (
    <div css={css`
      padding-left: 3.5rem;
    `}>
      <Heading variant="primary" title="Your schedule" subtitle="3 plants need your attention"/>
      <PlantWrapper>
        {
          !!plants.length ? (
            plants.map(({ imgUrl, id }: PlantProps) => (
              <Card key={id} imgUrl={imgUrl}/>
            ))
          ) : (
            <PlaceHolder>
              <Typography variant="subtitle" tag="p">No plant yet. Add some!</Typography>
            </PlaceHolder>
          )
        }
      </PlantWrapper>
    </div>
  );
};

export default Schedule;
