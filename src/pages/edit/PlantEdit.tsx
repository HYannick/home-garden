/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import ActionBar from '../../layout/ActionBar';
import { SideLayer } from '../../layout/SideLayer';
import { plantStore } from '../../api/plants.api';
import PlantForm from '../../components/plant-form/PlantForm';
import { useGetPlant } from '../home/home.hooks';
import { mapPlantData } from './plant-edit.mapper';
import { PlantProps } from './PlantEdit.types';

// const getFormData = (values: any) => {
//   const formData = new FormData();
//   Object.keys(values).forEach(key => formData.append(key, values[key]));
//   return formData;
// };

const PlantEdit: React.FC = ({ history, match }: any) => {
  const { t } = useTranslation();
  const { loading, plant, hasErrors } = useGetPlant(match.params.id, false);
  const submitPlant = async (values: PlantProps, actions: any) => {
    let payload = {...values};
    if (!values.has_moisture_sensor) {
      actions.setValues({ ...values, need_watering_frequency: true });
      payload = { ...values, need_watering_frequency: true };
    }
    const updated_plant_list = mapPlantData(payload);
    actions.setSubmitting(true);
    try {
      /* TODO: should check the sensorId and connect, if there is one
       * if not return an error on the sensor_id
       */
      // const { data: plant } = await PlantsAPI.post('/plants', getFormData(mapPlantData(values)));
      // should reformat the image

      await plantStore.setItem(plant.id, updated_plant_list);
      history.push('/');
      actions.setSubmitting(false);
    } catch (e) {
      // catch Error
      actions.setSubmitting(false);
    }
  };
  if (loading) {
    return <div>Loading ...</div>;
  }

  if (hasErrors) {
    return <div>Plant not found.</div>;
  }

  return (
    <Fragment>
      <ActionBar title={t('plant_edit_title', {plant_name: plant.name})}/>
      <PlantForm onSubmit={submitPlant} submitLabel={t('plant_form.button.editSubmit')}  initialValues={{
        ...plant,
        has_moisture_sensor: !!plant.sensor_id,
        need_watering_frequency: false
      }}/>
      <SideLayer/>
    </Fragment>
  );
};

export default withRouter(PlantEdit);
