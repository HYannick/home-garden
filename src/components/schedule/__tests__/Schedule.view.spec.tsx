import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../../theme-wrapper';
import ScheduleView from '../Schedule.view';
import { ScheduleProps } from '../Schedule.types';

afterEach(cleanup);
describe('Schedule', () => {

  const defaultProps: ScheduleProps = {
    t: jest.fn(),
    loading: false,
    plants: [],
    warning: 2,
    hasErrors: false,
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <ScheduleView {...defaultProps}/>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading message', () => {
    const props = {
      ...defaultProps,
      loading: true,
    };
    const { container } = renderWithTheme(
      <ScheduleView {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render cards', () => {
    const props: ScheduleProps = {
      ...defaultProps,
      loading: false,
      plants: [
        {name: 'Dracaena', days_left: 2, id: 'd-1-9321', picture: 'dracaena.jpeg'}
      ]
    };
    const { container } = renderWithTheme(
      <Router><ScheduleView {...props}/></Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
