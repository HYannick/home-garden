/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import React, { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import Heading from '../../layout/Heading';
import Drop from '../../core/svg/Drop';
import HappyCactus from '../../core/svg/HappyCactus';
import ImageFade from '../image-fade/ImageFade';
import { setVariant } from '../plant-list/PlantCard';
import { PlantWrapper, Card, PlaceHolder, SkeletonCard } from './Schedule.styled';
import { useGetNeedyPlantsList } from './Schedule.hooks';


const Schedule: React.FC = () => {
  const { loading, plants, warning, hasErrors } = useGetNeedyPlantsList();
  const { t } = useTranslation();

  const renderPlaceholderContent = () => {
    if (hasErrors) {
      return <span>{t('schedule.errors')}</span>;
    }
    return (
      <Fragment>
        <HappyCactus/>
        <span>{t('schedule.all_set')}</span>
      </Fragment>
    );
  };

  const renderData = () => {
    if (loading) {
      return [...Array(5)].map((_, i) => (
        <SkeletonCard key={i}>
          <SkeletonCard.Chip/>
        </SkeletonCard>
      ));
    }

    if (plants.length) {
      return plants.map(({ picture, name, id, days_left }: any) => (
        <Card key={id} to={`/plants/${id}`}>
          <Card.Media>
            <ImageFade src={picture} alt={name} placeholder="#EFFFE2"/>
          </Card.Media>
          <Card.Chip variant={setVariant(days_left)}><Drop/></Card.Chip>
        </Card>
      ));
    }

    return <PlaceHolder>{renderPlaceholderContent()}</PlaceHolder>;
  };

  return (
    <div css={css`
        margin: 2rem 0;
      `}>
      <div css={css`
        padding-left: 3.5rem;
      `}>
        <Heading
          variant="primary" title="Your schedule"
          subtitle={warning !== 0 ? t('needy_plants.needy', { count: warning }) : t('needy_plants.all_set')}/>
      </div>
      <PlantWrapper>
        <div>
          {renderData()}
        </div>
      </PlantWrapper>
    </div>
  );
};

export default Schedule;
