import React, { Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import dateFns from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useGetPlant } from '../home/home.hooks';
import ActionBar from '../../layout/ActionBar';
import Edit from '../../core/svg/Edit';
import { SideLayer } from '../../layout/SideLayer';
import { Overlay } from '../../components/Overlay';
import Drop from '../../core/svg/Drop';
import { setVariant } from '../../components/plant-list/PlantCard';
import DataProcessing from '../../core/svg/DataProcessing';
import { plantStore } from '../../api/plants.api';
import { getDaysLeft } from '../../core/utils/calc_dates';
import ImageFade from '../../components/image-fade/ImageFade';
import {
  Advices,
  Description, Frequency,
  GeneralStats, Hero,
  MoistureSensorStats,
  Name,
  Button,
  Picture,
  PlaceHolder,
  PlantInfos,
  WateringStatus,
  Infos,
} from './Plant.styled';

const PlantData = ({ t, plant }: any) => plant ? (
  <PlantInfos>
    <Description>{plant.description}</Description>
    <GeneralStats>{plant.stats}</GeneralStats>
    <MoistureSensorStats>{plant.sensorStats}</MoistureSensorStats>
    <Advices>{plant.tips}</Advices>
  </PlantInfos>
) : (
  <PlaceHolder>
    <DataProcessing/>
    <h2>{t('plant_details.upcoming')}</h2>
  </PlaceHolder>
);
const Plant: React.FC = ({ history, match }: any) => {
  const { t } = useTranslation();
  const { loading, plant, hasErrors, plantData, daysLeft, setDaysLeft } = useGetPlant(match.params.id, false);
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
          <Frequency>{t('plant_details.frequency')}<strong>{plant.watering_frequency}</strong> {t('plant_details.days_label')}</Frequency>
        </WateringStatus>
      </Hero>
      <PlantData plant={plantData} t={t}/>
      <SideLayer variant={setVariant(daysLeft)}/>
    </Fragment>
  );
};

export default Plant;
