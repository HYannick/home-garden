/** @jsx jsx */
import React  from 'react';
import { Field } from 'formik';
import { css, jsx } from '@emotion/core';
import { PlantProps } from '../../pages/create/PlantCreate.types';
import { FormCreate } from '../plant-form/PlantForm.styled';
import InputField from './InputField';
import Switch from './Switch';
import InputRange from './InputRange';

const MoistureSensorInput: React.FC<{ setFieldValue: Function, resetField: Function, values: PlantProps, errors: any, touched?: any, t: Function, testId: string }> = ({ setFieldValue, resetField, values, errors, touched, t, testId }: any) => (
  <div data-testid={testId}>
    <div css={(theme) => css`
        margin: 1rem 0 1.5rem;
        color: ${theme.palette.grey.dark};
      `}>
      {t('plant_form.sensor_notice')}
    </div>
    <FormCreate.Control>
      <div css={css`
        max-width: 20rem;
        input {
            padding: 0.5rem 2rem;
            font-weight: bold;
        }
      `}>
        <Field type="text" name="sensor_id" component={InputField} alignment="center"/>
        {errors.sensor_id && touched.sensor_id && <FormCreate.ErrorField>{errors.sensor_id}</FormCreate.ErrorField>}
      </div>
    </FormCreate.Control>
    <FormCreate.Control>
      <Field
        type="checkbox"
        name="need_watering_frequency"
        component={Switch}
        label={t('components.moisture_sensor_field.watering_frequency')}
        onChange={(need_watering_frequency: boolean) => {
          if (!need_watering_frequency) resetField('watering_frequency');
          setFieldValue('need_watering_frequency', need_watering_frequency);
        }}
      />
    </FormCreate.Control>
    {
      values.need_watering_frequency && (
        <FormCreate.Control data-testid="need_watering_frequency">
          <div css={css`margin: 2rem 1rem`}>
            <Field
              type="range" name="watering_frequency"
              label={t('plant_form.field_watering_frequency')}
              component={InputRange} min={2} max={31} step={1}
              onChange={(value: number) => setFieldValue('watering_frequency', value)}
            />
            {errors.watering_frequency && touched.watering_frequency &&
            <FormCreate.ErrorField>{errors.watering_frequency}</FormCreate.ErrorField>}
          </div>
        </FormCreate.Control>
      )
    }
  </div>
);

export default MoistureSensorInput;
