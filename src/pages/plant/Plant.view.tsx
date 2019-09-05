/** @jsx jsx */
import React, { Fragment } from 'react';
import { animated } from 'react-spring';
import { css, jsx } from '@emotion/core';
import ActionBar from '../../layout/ActionBar';
import { SideLayer } from '../../layout/SideLayer';
import { Overlay } from '../../components/Overlay';
import Drop from '../../core/svg/Drop';
import DataProcessing from '../../core/svg/DataProcessing';
import ImageFade from '../../components/image-fade/ImageFade';
import { Divider } from '../../layout/bottom-nav-bar/BottomNavBar.styled';
import Exposure from '../../core/svg/Exposure';
import Temperature from '../../core/svg/Temperature';
import Soil from '../../core/svg/Soil';
import { setVariant } from '../../core/utils/set_variant';
import ConfirmModal from '../../components/modal/templates/ConfirmModal';
import Modal from '../../components/modal/Modal';
import NoConnectionIcon from '../../core/svg/NoConnection';
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

const PlantData = ({ t, plant, daysLeft, hasDBErrors }: any) => {
  if (hasDBErrors) {
    return (
      <PlaceHolder>
        <NoConnectionIcon/>
        <h2>{t('plant_details.noConnexion')}</h2>
        <p>{t('plant_details.noConnexionDetails')}</p>
      </PlaceHolder>
    );
  }
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
      color: '#EDAE86',
    },
    {
      icon: Temperature,
      title: 'Temperature',
      level: plant.temperature_level,
      description: plant.temperature_description,
      color: '#44B7D1',
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
      color: '#90EAFF',
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
      <PlantStats stats={stats}/>
      <PlantTips>
        <PlantTips.Label>Some Tips</PlantTips.Label>
        <p>{plant.tips}</p>
      </PlantTips>
    </div>
  );
};

const PlantView: React.FC<any> = (props) => {
  const { t, loading, plant, hasErrors, plantData, daysLeft, number, actions, waterPlant, modalOpen, setModalOpen, deletePlant, hasDBErrors } = props;
  if (loading) {
    return <div>{t('plant_details.loading')}</div>;
  }

  if (hasErrors) {
    return <div>{t('plant_details.not_found')}</div>;
  }

  return (
    <Fragment>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        template={() => (
          <ConfirmModal
            onConfirm={() => deletePlant(plant.id)}
            title={t('modals.plant_removal.title')}
            subtitle={t('modals.plant_removal.subtitle')}
            onCancel={() => setModalOpen(false)}
          />
        )}
      />
      <ActionBar actions={actions} path="/plants"/>
      <Name variant={setVariant(daysLeft)}>{plant.custom_name || plant.name}</Name>
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
      <PlantData plant={plantData} t={t} daysLeft={daysLeft} hasDBErrors={hasDBErrors}/>
      <div css={css`
        height: 4rem;
      `}/>
      <SideLayer variant={setVariant(daysLeft)}/>
    </Fragment>
  );
};

export default PlantView;
