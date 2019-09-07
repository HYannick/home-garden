import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../../theme-wrapper';
import ProfileView from '../Profile.view';
import { ProfileViewProps } from '../Profile.types';

afterEach(cleanup);
describe('Profile Page', () => {
  const defaultProps: ProfileViewProps = {
    t: jest.fn().mockImplementation(() => 'profile_page.loading'),
    userLoading: false,
    countLoading: false,
    userInfos: {
      username: 'Mathilde',
      avatar: 'cute-kitten.jpg',
    },
    chartData: [],
    counters: [],
  };

  it('should render loading text properly', () => {
    const props: ProfileViewProps = {
      ...defaultProps,
      userLoading: true,
    };
    const { container } = renderWithTheme(
      <Router><ProfileView {...props} /></Router>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Router><ProfileView {...defaultProps} /></Router>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should have a loading message when userLoading is true', () => {
    const props: ProfileViewProps = {
      ...defaultProps,
      userLoading: true,
    };
    const { getByText } = renderWithTheme(
      <Router><ProfileView {...props} /></Router>,
    );

    expect(getByText(/^profile_page.loading/)).toHaveTextContent('profile_page.loading');
  });

  it('should have a loading message when countLoading is true', () => {
    const props: ProfileViewProps = {
      ...defaultProps,
      countLoading: true,
    };
    const { getByText } = renderWithTheme(
      <Router><ProfileView {...props} /></Router>,
    );

    expect(getByText(/^profile_page.loading/)).toHaveTextContent('profile_page.loading');
  });

  it('should display the username', () => {
    const { getByTestId } = renderWithTheme(
      <Router><ProfileView {...defaultProps} /></Router>,
    );

    expect(getByTestId('username')).toHaveTextContent('Mathilde');
  });

  it('should display the chart data', () => {
    const props: ProfileViewProps = {
      ...defaultProps,
      chartData: [
        { name: 'healthy', label: 'Healthy', variant: 'primary', value: 3 },
        { name: 'dead', label: 'Dead', variant: 'primary', value: 10 },
      ],
    };
    const { getByTestId } = renderWithTheme(
      <Router><ProfileView {...props} /></Router>,
    );

    expect(getByTestId('counters')).toHaveTextContent('03');
    expect(getByTestId('counters')).toHaveTextContent('10');
  });

  it('should display total amount of plants', () => {
    const props: ProfileViewProps = {
      ...defaultProps,
      counters: { total: 157 },
    };
    const { getByTestId } = renderWithTheme(
      <Router><ProfileView {...props} /></Router>,
    );

    expect(getByTestId('total_plants')).toHaveTextContent('157');
  });
});
