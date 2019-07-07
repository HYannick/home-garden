import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../theme-wrapper';
import Heading from '../Heading';

afterEach(cleanup);
describe('Heading', () => {
  const props = {
    title: 'Your data',
    subtitle: 'You have 2 lives left'
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Heading {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right label', () => {
    const { getByText } = renderWithTheme(
      <Heading {...props}/>,
    );
    expect(getByText(/^Your data/)).toHaveTextContent('Your data');
    expect(getByText(/^You have 2 lives left/)).toHaveTextContent('You have 2 lives left');
  });
});
