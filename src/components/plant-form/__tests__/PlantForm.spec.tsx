import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import PlantForm from '../PlantForm';

afterEach(cleanup);
describe('PlanForm', () => {
  const defaultProps = {
    t: jest.fn(),
    initialValues: {},
    onSubmit: jest.fn(),
    submitLabel: 'Create',
  };

  it('should render properly', () => {
    const { container } = renderWithTheme(
      <PlantForm {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the right submitLabel', () => {
    const { getByTestId } = renderWithTheme(
      <PlantForm {...defaultProps} />,
    );
    expect(getByTestId('submit')).toHaveTextContent('Create');
  });

  it('should display the has_moisture_sensor input', () => {
    const props = {
      ...defaultProps,
      initialValues: {
        has_moisture_sensor: true
      }
    };
    const { getByTestId } = renderWithTheme(
      <PlantForm {...props} />,
    );
    expect(getByTestId('moisture-sensor-input')).toBeTruthy();
  });

  it('should display the watering frequency input range', () => {
    const props = {
      ...defaultProps,
      initialValues: {
        has_moisture_sensor: false
      }
    };
    const { getByTestId } = renderWithTheme(
      <PlantForm {...props} />,
    );
    expect(getByTestId('watering-frequency-input')).toBeTruthy();
  });
});
