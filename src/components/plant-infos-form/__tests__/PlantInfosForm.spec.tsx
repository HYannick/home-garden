import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import PlantInfosForm from '../PlantInfosForm';
import { LevelData } from '../../../pages/plant-infos-create/PlantInfosCreate.types';

afterEach(cleanup);
describe('PlantInfosForm', () => {
  const defaultProps = {
    t: jest.fn(),
    initialValues: {
      name: '',
      latin_name: '',
      family: '',
      description: '',
      exposure_level: LevelData.LOW,
      exposure_description: '',
      temperature_level: LevelData.LOW,
      temperature_description: '',
      watering_level: LevelData.LOW,
      watering_description: '',
      soil_type: '',
      tips: ''
    },
    onSubmit: jest.fn(),
    submitLabel: 'Create',
  };

  it('should render properly', () => {
    const { container } = renderWithTheme(
      <PlantInfosForm {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });
});
