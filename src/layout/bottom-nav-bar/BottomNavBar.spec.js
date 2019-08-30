import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../theme-wrapper';
import { BottomNavBar } from './BottomNavBar';

afterEach(cleanup);
describe('BottomNavBar', () => {
  const props = {
    location: { pathname: '' },
    match: jest.fn(),
    history: {},
  };
  it('should match snapshot on closed', () => {
    const { container } = renderWithTheme(
      <Router><BottomNavBar {...props}/></Router>,
    );
    expect(container).toMatchSnapshot();
  });
  it('should match snapshot on open', () => {
    const { getByTestId, container } = renderWithTheme(
      <Router><BottomNavBar {...props}/></Router>,
    );
    const button = getByTestId('add');
    fireEvent.click(button);
    expect(container).toMatchSnapshot();
  });
});
