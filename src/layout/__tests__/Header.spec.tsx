import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../theme-wrapper';
import HeaderView from '../header/Header.view';

afterEach(cleanup);
describe('Header', () => {
  const props = {
    t: jest.fn(),
    now: 'now',
    username: 'Alita',
    imgUrl: 'source.gunnm.jpg',
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Router> <HeaderView {...props}/> </Router>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render the right username', () => {
    const { getByText } = renderWithTheme(
      <Router> <HeaderView {...props}/></Router>,
    );
    expect(getByText(/^Alita/)).toHaveTextContent('Alita');
  });
});
