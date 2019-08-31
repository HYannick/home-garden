import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import TextAreaField from '../TextAreaField';

afterEach(cleanup);
describe('TextAreaField', () => {
  const props = {
    field: {
      name: 'puke',
      onChange: jest.fn(),
    },
    type: 'text',
    label: 'Should I puke?',
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <TextAreaField {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right label', () => {
    const { getByText } = renderWithTheme(
      <TextAreaField {...props}/>,
    );
    expect(getByText(/^Should I puke/)).toHaveTextContent('Should I puke');
  });
  it('should trigger onChange', () => {
    const { getByLabelText } = renderWithTheme(
      <TextAreaField {...props}/>,
    );
    const input = getByLabelText('Should I puke?');
    fireEvent.change(input, { target: { value: 'm' } });
    expect(props.field.onChange).toHaveBeenCalledTimes(1);
  });
});
