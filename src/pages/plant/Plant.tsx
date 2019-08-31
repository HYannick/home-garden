/** @jsx jsx */
import React, { Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import dateFns from 'date-fns';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import { useGetPlant } from '../home/home.hooks';
import ActionBar from '../../layout/ActionBar';
import Edit from '../../core/svg/Edit';
import { SideLayer } from '../../layout/SideLayer';
import { Overlay } from '../../components/Overlay';
import Drop from '../../core/svg/Drop';
import DataProcessing from '../../core/svg/DataProcessing';
import { plantStore } from '../../api/plants.api';
import { getDaysLeft } from '../../core/utils/calc_dates';
import ImageFade from '../../components/image-fade/ImageFade';
import { Divider } from '../../layout/bottom-nav-bar/BottomNavBar.styled';
import Exposure from '../../core/svg/Exposure';
import Temperature from '../../core/svg/Temperature';
import Soil from '../../core/svg/Soil';
import { setVariant } from '../../core/utils/set_variant';
import {
  Frequency,
  Hero,
  Name,
  Button,
  Picture,
  PlaceHolder,
  PlantInfos,
  WateringStatus,
  Infos,
  Label,
  DropWrapper, PlantTips,
} from './Plant.styled';
import { StatsTypes } from './Plant.types';
import PlantStats from './components/PlantStats';

const PlantData = ({ t, plant, daysLeft }: any) => {
  if (!plant || (plant && !plant.is_validated)) {
    return (
      <PlaceHolder>
        <DataProcessing/>
        <h2>{t('plant_details.upcoming')}</h2>
      </PlaceHolder>
    );
  }

  const stats: StatsTypes[] = [
    {
      icon: Exposure,
      title: 'Exposure',
      level: plant.exposure_level,
      description: plant.exposure_description,
      color: '#EDAE86'
    },
    {
      icon: Temperature,
      title: 'Temperature',
      level: plant.temperature_level,
      description: plant.temperature_description,
      color: '#44B7D1'
    },
    {
      icon: () => (
        <DropWrapper className='icon-drop'>
          <Drop fill="none"/>
        </DropWrapper>
      ),
      title: 'Watering',
      level: plant.watering_level,
      description: plant.watering_description,
      color: '#90EAFF'
    },
    {
      icon: Soil,
      title: 'Soil type',
      description: plant.soil_type,
    },
  ];

  return (
    <div>
      <PlantInfos>
        <Label variant={setVariant(daysLeft)}><span>Description</span></Label>
        <PlantInfos.Names>
          <div>
            <h6>Latin Name</h6>
            <p>{plant.latin_name}</p>
          </div>
          <div>
            <h6>Family</h6>
            <p>{plant.family}</p>
          </div>
        </PlantInfos.Names>
        <Divider/>
        <PlantInfos.Description>{plant.description}</PlantInfos.Description>
      </PlantInfos>
      <PlantStats stats={stats} />
      <PlantTips>
        <PlantTips.Label>Some Tips</PlantTips.Label>
        <p>{plant.tips}</p>
      </PlantTips>
    </div>
  );
};

const Plant: React.FC = ({ history, match }: any) => {
  const { t } = useTranslation();
  const { loading, plant, hasErrors, plantData, daysLeft, setDaysLeft } = useGetPlant(match.params.id);
  const { number } = useSpring({ number: daysLeft });

  if (loading) {
    return <div>{t('plant_details.loading')}</div>;
  }

  if (hasErrors) {
    return <div>{t('plant_details.not_found')}</div>;
  }

  const waterPlant = async () => {
    const now: any = dateFns.format(new Date());
    const updatedPlant = {
      ...plant,
      last_watering_date: now,
    };
    await plantStore.setItem(plant.id, updatedPlant);
    setDaysLeft(getDaysLeft(now, plant.watering_frequency));
  };

  return (
    <Fragment>
      <ActionBar actions={[{
        key: 1,
        icon: Edit,
        onClick: () => history.push(`/plants/${plant.id}/edit`),
      }]}/>
      <Name variant={setVariant(daysLeft)}>{plant.name}</Name>
      <Hero>
        <Picture>
          <Overlay color="#000" opacity={0.25}/>
          <ImageFade src={plant.picture} alt={plant.name} placeholder="#EFFFE2"/>
        </Picture>
        <WateringStatus>
          <Infos>
            <span>{t('plant_details.next_watering')}</span>
            <h2>
              <animated.span
                style={{ marginRight: '0.5rem' }}>{number.interpolate((n: any) => n.toFixed())}</animated.span>
              {t('plant_details.days_label')}
            </h2>
          </Infos>
          <Button variant={setVariant(daysLeft)}>
            <button type="button" onClick={waterPlant}>
              <Drop/>
            </button>
          </Button>
          <Frequency>{t('plant_details.frequency')}<strong>{plant.watering_frequency}</strong> {t('plant_details.days_label')}
          </Frequency>
        </WateringStatus>
      </Hero>
      <PlantData plant={plantData} t={t} daysLeft={daysLeft}/>
      <div css={css`
        height: 4rem;
      ` }/>
      <SideLayer variant={setVariant(daysLeft)}/>
    </Fragment>
  );
};

export default Plant;
