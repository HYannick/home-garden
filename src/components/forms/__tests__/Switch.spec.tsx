import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import Switch from '../Switch';

afterEach(cleanup);
describe('Switch', () => {
  const props = {
    field: {
      name: 'puke'
    },
    onChange: jest.fn(),
    label: 'Should I puke?'
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Switch {...props}/>
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right label', () => {
    const { getByText } = renderWithTheme(
      <Switch {...props}/>
    );
    expect(getByText(/^Should I puke/)).toHaveTextContent('Should I puke');
  });
  it('should trigger onChange', () => {
    const { getByText } = renderWithTheme(
      <Switch {...props}/>
    );

    fireEvent.click(getByText('Should I puke?'));
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
