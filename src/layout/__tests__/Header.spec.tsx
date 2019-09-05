import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../theme-wrapper';
import Header from '../Header';

afterEach(cleanup);
describe('Header', () => {
  const props = {
    username: 'Alita',
    imgUrl: 'source.gunnm.jpg',
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Router> <Header {...props}/> </Router>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right username', () => {
    const { getByText } = renderWithTheme(
      <Router> <Header {...props}/></Router>,
    );
    expect(getByText(/^Alita/)).toHaveTextContent('Alita');
  });
});
