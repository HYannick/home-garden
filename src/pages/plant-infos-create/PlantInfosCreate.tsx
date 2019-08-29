/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import ActionBar from '../../layout/ActionBar';
import { SideLayer } from '../../layout/SideLayer';
import PlantInfosForm from '../../components/plant-infos-form/PlantInfosForm';
import { LevelData, PlantinfosProps } from './PlantInfosCreate.types';

// const getFormData = (values: any) => {
//   const formData = new FormData();
//   Object.keys(values).forEach(key => formData.append(key, values[key]));
//   return formData;
// };

const PlantInfosCreate: React.FC = ({ history }: any) => {
  const { t } = useTranslation();

  const initialValues: PlantinfosProps = {
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
    tips: ''
  };

  const goToCreateForm = (values: PlantinfosProps) => history.push({pathname: '/create', state: {plantInfos: values}});

  return (
    <Fragment>
      <ActionBar title={t('plant_create_title')}/>
      <PlantInfosForm onSubmit={goToCreateForm} initialValues={initialValues} submitLabel={t('plant_form.button.submit')}/>
      <SideLayer fullHeight/>
    </Fragment>
  );
};

export default withRouter(PlantInfosCreate);