import React from 'react';
import 'jest-dom/extend-expect'
import { BottomNavBar } from './BottomNavBar'
import { renderWithTheme } from "../theme-wrapper";
import { cleanup, fireEvent } from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

afterEach(cleanup);
describe('BottomNavBar', () => {
  const props = {
    location: {pathname: ''},
    match: jest.fn(),
    history: {}
  };

  it('should open navbar', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Router><BottomNavBar {...props}/></Router>
    );
    const button = getByTestId('add');
    fireEvent.click(button);
    expect(getByText(/^Want to make the family grow/)).toHaveTextContent('Want to make the family grow')
  });
  it('should match snapshot on closed', () => {
    const { container } = renderWithTheme(
      <Router><BottomNavBar {...props}/></Router>
    );
    expect(container).toMatchSnapshot()
  });
  it('should match snapshot on open', () => {
    const { getByTestId, container } = renderWithTheme(
      <Router><BottomNavBar {...props}/></Router>
    );
    const button = getByTestId('add');
    fireEvent.click(button);
    expect(container).toMatchSnapshot()
  });
});
