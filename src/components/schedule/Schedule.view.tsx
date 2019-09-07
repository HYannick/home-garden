/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import React, { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { animated, useTransition } from 'react-spring';
import Heading from '../../layout/Heading';
import Drop from '../../core/svg/Drop';
import HappyCactus from '../../core/svg/HappyCactus';
import ImageFade from '../image-fade/ImageFade';
import { setVariant } from '../../core/utils/set_variant';
import { PlantWrapper, Card, PlaceHolder, SkeletonCard } from './Schedule.styled';
import { PlantProp, ScheduleProps } from './Schedule.types';


const ScheduleView: React.FC<ScheduleProps> = ({ t, loading, plants, warning, hasErrors }) => {
  const transition = useTransition(loading, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
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
    if (plants.length) {
      return plants.map(({ picture, name, id, days_left }: PlantProp) => (
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
          variant="primary" title={t('schedule.title')}
          subtitle={warning !== 0 ? t('needy_plants.needy', { count: warning }) : t('needy_plants.all_set')}/>
      </div>
      <PlantWrapper>
        {
          transition.map(({ item, key, props }) => (
            item ? (
              <animated.div key={key} style={props} >
                {
                  [...Array(5)].map((_, i) => (
                    <SkeletonCard key={i}>
                      <SkeletonCard.Chip/>
                    </SkeletonCard>
                  ))
                }
              </animated.div>
            ) : (
              <animated.div key={key} style={props}>
                {renderData()}
              </animated.div>
            )
          ))
        }
      </PlantWrapper>
    </div>
  );
};

export default ScheduleView;
