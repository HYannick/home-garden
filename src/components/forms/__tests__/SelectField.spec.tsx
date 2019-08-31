import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import SelectField from '../SelectField';
import { LevelData } from '../../../pages/plant-infos-create/PlantInfosCreate.types';

afterEach(cleanup);
describe('SelectField', () => {
  const props = {
    field: {
      name: 'puke',
      onChange: jest.fn(),
    },
    defaultValue: LevelData.LOW,
    selectors: [
      {
        label: 'low',
        value: LevelData.LOW,
      },
      {
        label: 'medium',
        value: LevelData.MEDIUM,
      },
      {
        label: 'high',
        value: LevelData.HIGH,
      },
    ],
    type: 'text',
    label: 'Should I puke?',
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <SelectField {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right label', () => {
    const { getByText } = renderWithTheme(
      <SelectField {...props}/>,
    );
    expect(getByText(/^Should I puke/)).toHaveTextContent('Should I puke');
  });
  it('should trigger onChange', () => {
    const { getByLabelText } = renderWithTheme(
      <SelectField {...props}/>,
    );
    const input = getByLabelText('Should I puke?');
    fireEvent.change(input, { target: { value: LevelData.MEDIUM } });
    expect(props.field.onChange).toHaveBeenCalledTimes(1);
  });
});
