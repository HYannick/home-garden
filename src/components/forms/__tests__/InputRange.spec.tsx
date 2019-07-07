import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import InputRange from '../InputRange';

afterEach(cleanup);
describe('InputRange', () => {
  const props = {
    field: {
      name: 'puke',
    },
    type: 'text',
    label: 'Should I puke?',
    min: 2,
    max: 10,
    step: 1,
    onChange: jest.fn()
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <InputRange {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });
});
