import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../theme-wrapper';
import ActionBar from '../ActionBar';

afterEach(cleanup);
describe('ActionBar', () => {
  const routerProps = {
    location: { pathname: '' },
    match: jest.fn(),
    history: {},
  };


  it('should render the actionBar properly without action', () => {
    const { container } = renderWithTheme(
      <Router>
        <ActionBar title="New Species" actions={[{
          key: 1,
          icon: () => <div>Icon Edit</div>,
          onClick: jest.fn(),
        }]} {...routerProps}/>
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the actionBar properly with the right title', () => {
    const { getByText } = renderWithTheme(
      <Router>
        <ActionBar title="New Species" actions={[]} {...routerProps}/>
      </Router>,
    );
    expect(getByText(/^New Species/)).toHaveTextContent('New Species');
  });

  it('should render the actionBar properly with actions', () => {
    const actions = [{
      key: 1,
      icon: () => <div>Icon Edit</div>,
      onClick: jest.fn(),
    }];
    const { getByText } = renderWithTheme(
      <Router>
        <ActionBar title="New Species" actions={actions} {...routerProps}/>
      </Router>,
    );
    const action = getByText(/^Icon Edit/);
    expect(action).toHaveTextContent('Icon Edit');
    fireEvent.click(action);
    expect(actions[0].onClick).toHaveBeenCalledTimes(1);
  });
});
