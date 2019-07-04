/** @jsx jsx */
import React, {Fragment} from 'react';
import {css, jsx} from '@emotion/core';
import styled from '@emotion/styled';
import ActionBar from "../../layout/ActionBar";
import ImageUpload from "../../components/forms/ImageUpload";
import {Field, Form, Formik} from "formik";
import InputRange from '../../components/forms/InputRange';
import Switch from "../../components/forms/Switch";
import InputField from "../../components/forms/InputField";
import DatePicker from "../../components/forms/DatePicker";
import plantCreateValidation from "./plant-create.validation";
import {SideLayer} from "../../layout/SideLayer";
import {Trans, useTranslation} from "react-i18next";
import {Button} from "../../components/Button";


interface InitialValuesProps {
  name: string,
  picture: File | null,
  last_watering_date: string,
  has_moisture_sensor: boolean,
  sensor_id: string,
  watering_frequency: number,
  need_watering_frequency: boolean
}


const ImageCreate = styled(ImageUpload)`
  width: calc(100% - 6.5rem);
  height: 30rem;
  margin: 1rem 0 0 4rem;
  border-radius: 4rem;
  overflow: hidden;
`;

const FormWrapper = styled('div')`
  display: flex;
`;

const FormTitle = styled('div')`
  width: 5rem;
  position: relative;
  & > p {
    position: absolute;
    top: 25rem;
    left: 30%;
    width: 20rem;
    margin: 0;
    font-size: 2.5rem;
    font-weight: 800;
    color: ${({theme}) => theme.palette.warning.dark};
    transform: rotate(-90deg);
    transform-origin: 0 0.6rem;
  }
`;

const FormControl = styled('div')`
  margin-bottom: 2rem;
`;

const StyledForm = styled(Form)`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 4rem;
    left: 1.5rem;
    background-color: ${({theme}) => theme.palette.warning.dark};
    border-radius: 40px;
    width: 1rem;
    height: 1rem;
  }
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  button {
    flex-basis: 48%;
  }
`;

const Infos = styled('p')`
  color: ${({theme}) => theme.palette.grey.dark};
  margin: 2rem 0;
`;


const MoistureSensorInput: React.FC<{ setFieldValue: Function, resetField: Function, values: InitialValuesProps, errors: any, touched: any, t: Function }> = ({setFieldValue, resetField, values, errors, touched, t}: any) => (
  <Fragment>
    <div css={(theme) => css`
        margin: 1rem 0 1.5rem;
        color: ${theme.palette.grey.dark};
      `}>
      {t('plant_create.sensor_notice')}
    </div>
    <FormControl>
      <div css={css`
        max-width: 20rem;
        input {
            padding: 0.5rem 2rem;
            font-weight: bold;
        }
      `}>
        <Field type="text" name="sensor_id" component={InputField} alignment="center"/>
        {errors.sensor_id && touched.sensor_id && <ErrorField>{errors.sensor_id}</ErrorField>}
      </div>
    </FormControl>
    <FormControl>
      <Field type="checkbox" name="need_watering_frequency"
             component={Switch}
             label="Do you want to set a watering frequency?"
             onChange={(need_watering_frequency: boolean) => {
               if (!need_watering_frequency) resetField('watering_frequency');
               setFieldValue('need_watering_frequency', need_watering_frequency)
             }}
      />
    </FormControl>
    {
      values.need_watering_frequency && (
        <FormControl>
          <div css={css`margin: 2rem 1rem`}>
            <Field type="range" name="watering_frequency" label={t('plant_create.field_watering_frequency')}
                   component={InputRange} min={2} max={31} step={1}
                   onChange={(value: number) => setFieldValue('watering_frequency', value)}
            />
          </div>
        </FormControl>
      )
    }

  </Fragment>
);

export const ErrorField = styled('div')`
  padding: 1rem 0;
  color: ${({theme}) => theme.palette.danger.dark};
`;

const PlantCreate: React.FC = () => {
  const {t} = useTranslation();

  const initialValues: InitialValuesProps = {
    name: '',
    picture: null,
    last_watering_date: '',
    has_moisture_sensor: false,
    sensor_id: '',
    watering_frequency: 2,
    need_watering_frequency: false
  };

  const submitPlant = (values: any, actions: any) => {
    console.log(values, actions)
  };

  return (
    <Fragment>
      <ActionBar title={t('plant_create.form_title')}/>
      <Formik
        validate={plantCreateValidation}
        onSubmit={submitPlant}
        initialValues={initialValues}
        render={(props) => {
          const {errors, touched, isSubmitting, values, setFieldValue} = props;
          const resetField = (field: string) => setFieldValue(field, '');

          return (
            <StyledForm>
              <Field type="text" name="picture" component={ImageCreate}
                     onImageLoaded={(imgData: { src: string, url: string }) => setFieldValue('picture', imgData.url)}/>
              <FormWrapper>
                <FormTitle>
                  <p>Plant infos</p>
                </FormTitle>
                <div css={css`flex:1; padding: 0 2.5rem 0 1rem; margin-top: 2rem;`}>
                  <FormControl>
                    <Field type="text" name="name" component={InputField} label={t('plant_create.field_name')}/>
                    {errors.name && touched.name && <ErrorField>{errors.name}</ErrorField>}
                  </FormControl>
                  <FormControl>
                    <Field type="date" name="last_watering_date" component={DatePicker}
                           label={t('plant_create.field_last_watering_date')}
                           onDateSelected={(date: Date) => setFieldValue('last_watering_date', date)}/>
                    {errors.last_watering_date && touched.last_watering_date &&
                    <ErrorField>{errors.last_watering_date}</ErrorField>}
                  </FormControl>
                  <FormControl>
                    <Field type="checkbox" name="has_moisture_sensor"
                           component={Switch}
                           label={t('plant_create.field_has_moisture_sensor')}
                           onChange={(has_moisture_sensor: boolean) => {
                             if (!has_moisture_sensor) resetField('sensor_id');
                             setFieldValue('has_moisture_sensor', has_moisture_sensor)
                           }}
                    />
                    {values.has_moisture_sensor && (<MoistureSensorInput {...props} resetField={resetField} t={t}/>)}
                  </FormControl>
                  {
                    !values.has_moisture_sensor && (
                      <FormControl>
                        <Field type="range" name="watering_frequency" label={t('plant_create.field_watering_frequency')}
                               component={InputRange} min={2} max={31} step={1}
                               onChange={(value: number) => setFieldValue('watering_frequency', value)}
                        />
                      </FormControl>
                    )
                  }
                  <FormControl>
                    <Infos>
                      <Trans i18nKey="plant_create.form_notice">
                        Theses data will be added to our database in order to fill it and let you have a better
                        experience with our app. If you want to participate, let us know by <strong>contacting
                        us</strong>!
                      </Trans>
                    </Infos>
                    <ButtonWrapper>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {t('plant_create.button.submit')}
                      </Button>
                      <Button variant="danger" type="reset" disabled={isSubmitting}>
                        {t('plant_create.button.cancel')}
                      </Button>
                    </ButtonWrapper>
                  </FormControl>
                </div>
              </FormWrapper>
            </StyledForm>
          )
        }}
      />
      <SideLayer/>
    </Fragment>
  );
};

export default PlantCreate;
