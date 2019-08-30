/** @jsx jsx */
import React from 'react';
import { Field, Formik } from 'formik';
import { css, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import plantInfosCreateValidation from '../../pages/plant-infos-create/plant-infos-create.validation';
import InputField from '../forms/InputField';
import { Button } from '../Button';
import { LevelData, PlantInfosProps } from '../../pages/plant-infos-create/PlantInfosCreate.types';
import TextAreaField from '../forms/TextAreaField';
import SelectField from '../forms/SelectField';
import { FormCreate } from './PlantInfosForm.styled';

interface PlantFormProps {
  onSubmit: any,
  initialValues: PlantInfosProps,
  submitLabel: string
}

export const Label = styled('span')`
    font-size: 2rem;
    color: ${({theme}) => theme.palette.warning.dark};
    margin-bottom: 1rem;
    display: block;
`;

export const Spacer = styled('div')`
  height: 2rem;
`;

const AreaField: React.FC<{ label: string, levelName: string, descriptionName: string }> = ({ label, levelName, descriptionName }) => {
  const { t } = useTranslation();

  const selectors = [
    {
      label: t('plant_infos_form.level_select.low'),
      value: LevelData.LOW,
    },
    {
      label: t('plant_infos_form.level_select.medium'),
      value: LevelData.MEDIUM,
    },
    {
      label: t('plant_infos_form.level_select.high'),
      value: LevelData.HIGH,
    },
  ];

  return (
    <FormCreate.Control>
      <Label>{label}</Label>
      <span>{t('plant_infos_form.field_level_label')}</span>
      <Field type="text" name={levelName} selectors={selectors} component={SelectField}/>
      <Spacer />
      <span>{t('plant_infos_form.field_tips_label')}</span>
      <Field name={descriptionName} component={TextAreaField}/>
    </FormCreate.Control>
  );
};


const PlantInfosForm: React.FC<PlantFormProps> = ({ onSubmit, initialValues, submitLabel }) => {
  const { t } = useTranslation();

  return (
    <Formik
      validate={(values) => plantInfosCreateValidation(values, t)}
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={(props) => {
        const { errors, touched, isSubmitting } = props;
        return (
          <FormCreate>
            <FormCreate.Wrapper>
              <FormCreate.Title>
                <p>Plant infos</p>
              </FormCreate.Title>
              <div css={css`flex:1; padding: 0 2.5rem 0 2rem;`}>
                <FormCreate.HelperText>
                  {t('plant_infos_form.helper_text')}
                </FormCreate.HelperText>
                <FormCreate.Control>
                  <Field type="text" name="name" component={InputField} label={t('plant_infos_form.field_name')}/>
                  {errors.name && touched.name && <FormCreate.ErrorField>{errors.name}</FormCreate.ErrorField>}
                </FormCreate.Control>
                <FormCreate.Control>
                  <Field
                    type="text" name="latin_name" component={InputField}
                    label={t('plant_infos_form.field_latin_name')}/>
                </FormCreate.Control>
                <FormCreate.Control>
                  <Field type="text" name="family" component={InputField} label={t('plant_infos_form.field_family')}/>
                </FormCreate.Control>
                <AreaField
                  label={t('plant_infos_form.field_exposure')}
                  levelName="exposure_level"
                  descriptionName="exposure_description"/>
                <AreaField
                  label={t('plant_infos_form.field_temperature')}
                  levelName="temperature_level"
                  descriptionName="temperature_description"/>
                <AreaField
                  label={t('plant_infos_form.field_watering')}
                  levelName="watering_level"
                  descriptionName="watering_description"/>
                <FormCreate.Control>
                  <Label>{t('plant_infos_form.field_soil')}</Label>
                  <span>{t('plant_infos_form.field_soil_helper')}</span>
                  <Field name="temperature_description" component={TextAreaField}/>
                </FormCreate.Control>
                <FormCreate.Control>
                  <Label>{t('plant_infos_form.field_plant_tips')}</Label>
                  <span>{t('plant_infos_form.field_plant_tips_helper')}</span>
                  <Field name="tips" component={TextAreaField}/>
                </FormCreate.Control>
                <FormCreate.Control>
                  <FormCreate.ButtonWrapper>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      {submitLabel}
                    </Button>
                    <Button variant="danger" type="reset" disabled={isSubmitting}>
                      {t('plant_form.button.cancel')}
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

export default PlantInfosForm;
