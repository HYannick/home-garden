import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../theme-wrapper';
import SearchHeader from '../SearchHeader';

afterEach(cleanup);
describe('SearchHeader', () => {
  const props = {
    onSubmit: jest.fn(),
    cover: 'kitten.jpg',
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Router><SearchHeader {...props}/></Router>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right label', () => {
    const { getByText } = renderWithTheme(
      <Router><SearchHeader {...props}/></Router>,
    );
    expect(getByText(/^search.title/)).toHaveTextContent('search.title');
  });
});
