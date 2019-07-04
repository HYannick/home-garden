/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {css, jsx} from "@emotion/core";
import Typography from "./Typography";


const Heading = styled('div')<{variant?: string}>`
  margin-top: 2rem;
  & h1 {
    font-size: 3rem;
    color: ${({theme}) => theme.palette.grey.dark};
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color:  ${({variant, theme}) => theme.palette[variant  || 'primary'].light};
      border:  0.2rem solid ${({variant, theme}) => theme.palette[variant || 'primary'].dark};
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 1rem;
    }
  }
  & h6 {
    font-size: 1.7rem;
    color: ${({theme}) => theme.palette.grey.light};
    margin-bottom: 2rem;
  }
`;
interface CardProps {
  key: string,
  imgUrl: string
}

const Card = styled('div')<CardProps>`
  
`;

const PlaceHolder = styled('div')`
  background-color: ${({theme}) => theme.palette.primary.light};
  border-radius: 1rem 0 0 1rem;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  padding: 2rem;
  border: 0.1rem dotted ${({theme}) => theme.palette.primary.dark};
  
  & p {
  color: ${({theme}) => theme.palette.primary.dark};
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
      <Heading variant="primary">
        <Typography variant="title" weight="600" tag="h1" noMargin>Your Schedule</Typography>
        <Typography variant="body" weight="400" tag="h6" noMargin><strong>2</strong> plants need your attention</Typography>
      </Heading>
      <PlantWrapper>
      {
        !!plants.length ? (
          plants.map(({imgUrl, id}: PlantProps) => (
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
