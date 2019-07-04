import React from 'react';
import 'jest-dom/extend-expect'
import {renderWithTheme} from "../theme-wrapper";
import {cleanup} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import ActionBar from "./ActionBar";

afterEach(cleanup);
describe('ActionBar', () => {
  const routerProps = {
    location: {pathname: ''},
    match: jest.fn(),
    history: {}
  };


  it('should render the actionBar properly without action', () => {
    const {container} = renderWithTheme(
      <Router>
        <ActionBar title="New Species" actions={[{
          icon: () => <div>Icon Edit</div>,
          onClick: () => console.log('Edit Mode')
        }]} {...routerProps}/>
      </Router>
    );
    expect(container).toMatchSnapshot()
  });

  it('should render the actionBar properly with the right title', () => {
    const {getByText} = renderWithTheme(
      <Router>
        <ActionBar title="New Species" actions={[]} {...routerProps}/>
      </Router>
    );
    expect(getByText(/^New Species/)).toHaveTextContent('New Species')
  });

  it('should render the actionBar properly with actions', () => {
    const {getByText} = renderWithTheme(
      <Router>
        <ActionBar title="New Species" actions={[{
          icon: () => <div>Icon Edit</div>,
          onClick: () => console.log('Edit Mode')
        }]} {...routerProps}/>
      </Router>
    );
    expect(getByText(/^Icon Edit/)).toHaveTextContent('Icon Edit')
  });
});
