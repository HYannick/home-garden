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

const PlantEdit: React.FC = ({ history, match }: any) => {
  const { t } = useTranslation();
  const { loading, plant, hasErrors } = useGetPlant(match.params.id);
  const submitPlant = async (values: PlantProps, actions: any) => {
    let payload = { ...values };
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

      const { id } = await plantStore.setItem(plant.id, updated_plant_list);
      history.push(`/plants/${id}`);
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
      <ActionBar title={t('plant_edit_title', { plant_name: plant.name })} path={`/plants/${plant.id}`}/>
      <PlantForm onSubmit={submitPlant} submitLabel={t('plant_form.button.edit_submit')} initialValues={{
        ...plant,
        has_moisture_sensor: !!plant.sensor_id,
        need_watering_frequency: false,
      }}/>
      <SideLayer fullHeight/>
    </Fragment>
  );
};

export default withRouter(PlantEdit);
