import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import DatePicker from '../DatePicker';

afterEach(cleanup);
describe('DatePicker', () => {
  const props = {
    field: {
      name: 'puke',
    },
    type: 'text',
    label: 'Should I puke?',
    onDateSelected: jest.fn()
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <DatePicker {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right label', () => {
    const { getByText } = renderWithTheme(
      <DatePicker {...props}/>,
    );
    expect(getByText(/^Should I puke/)).toHaveTextContent('Should I puke');
  });
  it('should trigger onChange', () => {
    const { getByText } = renderWithTheme(
      <DatePicker {...props}/>,
    );
    const dateBtn = getByText('17');
    fireEvent.click(dateBtn);
    expect(props.onDateSelected).toHaveBeenCalledTimes(1);
  });
});
