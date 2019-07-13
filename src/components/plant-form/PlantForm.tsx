/** @jsx jsx */
import React  from 'react';
import { Field, Formik } from 'formik';
import { css, jsx } from '@emotion/core';
import { Trans, useTranslation } from 'react-i18next';
import plantCreateValidation from '../../pages/create/plant-create.validation';
import InputField from '../forms/InputField';
import DatePicker from '../forms/DatePicker';
import Switch from '../forms/Switch';
import MoistureSensorInput from '../forms/MoistureSensorField';
import InputRange from '../forms/InputRange';
import { Button } from '../Button';
import { PlantProps } from '../../pages/create/PlantCreate.types';
import { FormCreate, ImageCreate } from './PlantForm.styled';

interface PlantFormProps{
  onSubmit: any,
  initialValues: PlantProps
}

const PlantForm: React.FC<PlantFormProps> = ({onSubmit, initialValues}) => {
  const {t} = useTranslation();
  return (
    <Formik
      validate={(values) => plantCreateValidation(values, t)}
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={(props) => {
        const { errors, touched, isSubmitting, values, setFieldValue } = props;
        const resetField = (field: string) => setFieldValue(field, '');
        console.log(values);
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
  );
};

export default PlantForm;
