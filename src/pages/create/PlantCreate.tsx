/** @jsx jsx */
import React, { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { Field, Formik } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import ActionBar from '../../layout/ActionBar';
import InputRange from '../../components/forms/InputRange';
import Switch from '../../components/forms/Switch';
import InputField from '../../components/forms/InputField';
import DatePicker from '../../components/forms/DatePicker';
import { SideLayer } from '../../layout/SideLayer';
import { Button } from '../../components/Button';
import { plantStore } from '../../api/plants.api';
import MoistureSensorInput from '../../components/forms/MoistureSensorField';
import plantCreateValidation from './plant-create.validation';
import { mapPlantData } from './plant-create.mapper';
import { FormCreate, ImageCreate } from './PlantCreate.styled';
import { PlantProps } from './PlantCreate.types';

// const getFormData = (values: any) => {
//   const formData = new FormData();
//   Object.keys(values).forEach(key => formData.append(key, values[key]));
//   return formData;
// };

const PlantCreate: React.FC = ({ history }: any) => {
  const { t } = useTranslation();

  const initialValues: PlantProps = {
    name: '',
    picture: null,
    last_watering_date: '',
    has_moisture_sensor: false,
    sensor_id: '',
    watering_frequency: 2,
    need_watering_frequency: false,
  };

  const submitPlant = async (values: PlantProps, actions: any) => {
    let payload = {};
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
      const updated_plant_list = mapPlantData(payload);
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
      <ActionBar title={t('plant_create.form_title')}/>
      <Formik
        validate={(values) => plantCreateValidation(values, t)}
        onSubmit={submitPlant}
        initialValues={initialValues}
        render={(props) => {
          const { errors, touched, isSubmitting, values, setFieldValue } = props;
          const resetField = (field: string) => setFieldValue(field, '');
          return (
            <FormCreate>
              <Field
                type="text"
                name="picture"
                component={ImageCreate}
                onImageLoaded={(imgData: { src: string, url: string }) => setFieldValue('picture', imgData.src)}/>
              <FormCreate.Wrapper>
                <FormCreate.Title>
                  <p>Plant infos</p>
                </FormCreate.Title>
                <div css={css`flex:1; padding: 0 2.5rem 0 1rem; margin-top: 2rem;`}>
                  <FormCreate.Control>
                    <Field type="text" name="name" component={InputField} label={t('plant_create.field_name')}/>
                    {errors.name && touched.name && <FormCreate.ErrorField>{errors.name}</FormCreate.ErrorField>}
                  </FormCreate.Control>
                  <FormCreate.Control>
                    <Field
                      type="date"
                      name="last_watering_date"
                      component={DatePicker}
                      label={t('plant_create.field_last_watering_date')}
                      onDateSelected={(date: Date) => setFieldValue('last_watering_date', date)}/>
                    {errors.last_watering_date && touched.last_watering_date &&
                    <FormCreate.ErrorField>{errors.last_watering_date}</FormCreate.ErrorField>}
                  </FormCreate.Control>
                  <FormCreate.Control>
                    <Field
                      type="checkbox"
                      name="has_moisture_sensor"
                      component={Switch}
                      label={t('plant_create.field_has_moisture_sensor')}
                      onChange={(has_moisture_sensor: boolean) => {
                        if (!has_moisture_sensor) resetField('sensor_id');
                        setFieldValue('has_moisture_sensor', has_moisture_sensor);
                      }}
                    />
                    {values.has_moisture_sensor && (<MoistureSensorInput {...props} resetField={resetField} t={t}/>)}
                  </FormCreate.Control>
                  {
                    !values.has_moisture_sensor && (
                      <FormCreate.Control>
                        <Field
                          type="range"
                          name="watering_frequency"
                          label={t('plant_create.field_watering_frequency')}
                          component={InputRange} min={2} max={31} step={1}
                          onChange={(value: number) => setFieldValue('watering_frequency', value)}
                        />
                      </FormCreate.Control>
                    )
                  }
                  <FormCreate.Control>
                    <FormCreate.Infos>
                      <Trans i18nKey="plant_create.form_notice">
                        Theses data will be added to our database in order to fill it and let you have a better
                        experience with our app. If you want to participate, let us know by <strong>contacting
                        us</strong>!
                      </Trans>
                    </FormCreate.Infos>
                    <FormCreate.ButtonWrapper>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {t('plant_create.button.submit')}
                      </Button>
                      <Button variant="danger" type="reset" disabled={isSubmitting}>
                        {t('plant_create.button.cancel')}
                      </Button>
                    </FormCreate.ButtonWrapper>
                  </FormCreate.Control>
                </div>
              </FormCreate.Wrapper>
            </FormCreate>
          );
        }}
      />
      <SideLayer/>
    </Fragment>
  );
};

export default withRouter(PlantCreate);
