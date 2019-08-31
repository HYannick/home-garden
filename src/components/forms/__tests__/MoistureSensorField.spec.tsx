import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { Formik } from 'formik';
import { renderWithTheme } from '../../../theme-wrapper';
import MoistureSensorInput from '../MoistureSensorField';

afterEach(cleanup);
describe('MoistureSensorField', () => {
  const props = {
    setFieldValue: jest.fn(),
    resetField: jest.fn(),
    values: {
      name: '',
      picture: null,
      last_watering_date: '',
      has_moisture_sensor: false,
      sensor_id: '',
      watering_frequency: 2,
      need_watering_frequency: false,
      custom_name: '',
    },
    testId: 'test',
    errors: {},
    t: jest.fn(),
  };
  it('should render the MoistureSensorField properly', () => {
    const { container } = renderWithTheme(
      <Formik
        initialValues={props.values}
        render={() => <MoistureSensorInput {...props}/>}
        onSubmit={jest.fn()}/>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should show watering_frequency if need_watering_frequency is enabled', () => {
    const newProps = {
      ...props,
      values: {
        ...props.values,
        need_watering_frequency: true,
      }
    };
    const { getByTestId } = renderWithTheme(
      <Formik
        initialValues={props.values}
        render={() => <MoistureSensorInput {...newProps}/>}
        onSubmit={jest.fn()}/>,
    );

    expect(getByTestId(/^need_watering_frequency/)).toBeTruthy();
  });
});
