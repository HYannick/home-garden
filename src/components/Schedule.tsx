/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Heading from '../layout/Heading';
import { useGetNeedyPlantsList } from '../pages/home/home.hooks';
import { VariantProps } from '../interfaces';
import Drop from '../core/svg/Drop';
import ImageFade from './image-fade/ImageFade';
import { setVariant } from './plant-list/PlantCard';
import HappyCactus from '../core/svg/HappyCactus';

interface CardProps extends VariantProps {
  key: string,
}

const Card: any = styled(NavLink)<CardProps>`
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

const PlantWrapper = styled('div')`
  overflow-x: scroll;
  padding: 0rem 0 2rem;
  > div {
    display: flex;
  }
`;

const PlaceHolder = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  font-size: 2rem;
  font-weight: 600;
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

export const renderMessage = (t: any, warning: number) => {
  if (warning >= 2) return `${warning} plants need your attention`;
  if (warning === 1) return `${warning} plant need your attention`;
  return 'You are all set ! :D';
};

const Schedule: React.FC = () => {
  const { plants, warning } = useGetNeedyPlantsList();
  const { t } = useTranslation();

  return (
    <div css={css`
        margin: 2rem 0;
      `}>
      <div css={css`
        padding-left: 3.5rem;
      `}>
        <Heading variant="primary" title="Your schedule" subtitle={renderMessage(t, warning)}/>
      </div>
      <PlantWrapper>
        <div>
          {
            plants.length ? (
              plants.map(({ picture, name, id, days_left }: any) => (
                <Card key={id} to={`/plants/${id}`}>
                  <Card.Media>
                    <ImageFade src={picture} alt={name} placeholder="#EFFFE2"/>
                  </Card.Media>
                  <Card.Chip variant={setVariant(days_left)}><Drop/></Card.Chip>
                </Card>
              ))
            ) : (
              <PlaceHolder>
                <HappyCactus/>
                <span>All your plants are safe !</span>
              </PlaceHolder>
            )
          }
        </div>
      </PlantWrapper>
    </div>
  );
};

export default Schedule;
