import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
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
  it('should render the right controls', () => {
    const props = {
      title: 'Your data',
      subtitle: 'You have 2 lives left',
      controls: [{
        key: 1,
        icon: () => <div>Icon</div>,
        onClick: jest.fn()
      }]
    };
    const { getByText } = renderWithTheme(
      <Heading {...props}/>,
    );
    const icon = getByText(/^Icon/)
    expect(icon).toHaveTextContent('Icon');
    fireEvent.click(icon);
    expect(props.controls[0].onClick).toHaveBeenCalledTimes(1);
  });
  it('should render controls', () => {
    const props = {
      title: 'Your data',
      subtitle: 'You have 2 lives left',
      controls: [{
        key: 1,
        icon: () => <div>Icon</div>,
        onClick: jest.fn()
      }]
    };
    const { container } = renderWithTheme(
      <Heading {...props}/>,
    );

    expect(container).toMatchSnapshot();
  });
});
