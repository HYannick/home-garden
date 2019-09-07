/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import ActionBar from '../../layout/ActionBar';
import { SideLayer } from '../../layout/SideLayer';
import PlantInfosForm from '../../components/plant-infos-form/PlantInfosForm';
import { LevelData, PlantInfosProps } from './PlantInfosCreate.types';

const PlantInfosCreate: React.FC = ({ history, location }: any) => {
  const { t } = useTranslation();
  const { state } = location;
  const initialValues: PlantInfosProps = {
    name: '',
    latin_name: '',
    family: '',
    description: '',
    exposure_level: LevelData.LOW,
    exposure_description: '',
    temperature_level: LevelData.LOW,
    temperature_description: '',
    watering_level: LevelData.LOW,
    watering_description: '',
    soil_type: '',
    tips: '',
    ...state && state.previousValues
  };
  const goToCreateForm = (values: PlantInfosProps) => history.push({pathname: '/create', state: {plantInfos: values}});

  return (
    <Fragment>
      <ActionBar title={t('plant_create_title')} path="/search"/>
      <PlantInfosForm onSubmit={goToCreateForm} initialValues={initialValues} submitLabel={t('plant_infos_form.button.submit')}/>
      <SideLayer fullHeight/>
    </Fragment>
  );
};

export default withRouter(PlantInfosCreate);
