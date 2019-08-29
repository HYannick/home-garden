/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import ActionBar from '../../layout/ActionBar';
import { SideLayer } from '../../layout/SideLayer';
import { PlantsAPI, plantStore } from '../../api/plants.api';
import PlantForm from '../../components/plant-form/PlantForm';
import { mapPlantData } from './plant-create.mapper';
import { PlantProps } from './PlantCreate.types';

// const getFormData = (values: any) => {
//   const formData = new FormData();
//   Object.keys(values).forEach(key => formData.append(key, values[key]));
//   return formData;
// };

const PlantCreate: React.FC = ({ history, location }: any) => {
  const { t } = useTranslation();
  const { state: {plantInfos} } = location;

  const initialValues: PlantProps = {
    name: plantInfos.name,
    custom_name: '',
    picture: null,
    last_watering_date: '',
    has_moisture_sensor: false,
    sensor_id: '',
    watering_frequency: 2,
    need_watering_frequency: false,
  };

  const submitPlant = async (values: PlantProps, actions: any) => {
    let payload = { ...values };
    if (!values.has_moisture_sensor) {
      actions.setValues({ ...values, need_watering_frequency: true });
      payload = { ...values, need_watering_frequency: true };
    }
    actions.setSubmitting(true);
    try {
      /* TODO: should check the sensorId and connect, if there is one
       * if not return an error on the sensor_id
       */
      // const { data: plant } = await PlantsAPI.post('/plants', getFormData(mapPlantData(values)));
      // should reformat the image
      const { data: DBPlant } = await PlantsAPI.post('/plants', plantInfos);
      const updated_plant_list = mapPlantData(payload, DBPlant.plantId);
      await plantStore.setItem(updated_plant_list.id, updated_plant_list);
      history.push('/');
      actions.setSubmitting(false);
    } catch (e) {
      // catch Error
      actions.setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <ActionBar title={t('plant_create_title')}/>
      <PlantForm onSubmit={submitPlant} initialValues={initialValues} submitLabel={t('plant_form.button.submit')}/>
      <SideLayer/>
    </Fragment>
  );
};

export default withRouter(PlantCreate);
