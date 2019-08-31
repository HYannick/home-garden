import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../../../../theme-wrapper';
import PlantCard from '../PlantCard';
import { PlantCardTypes } from '../PlantCard.types';

afterEach(cleanup);
describe('PlantCard', () => {
  const defaultProps: PlantCardTypes = {
    t: jest.fn().mockImplementation(() => 'plant_card.days_left'),
    plant: {
      name: 'Dracaena',
      custom_name: 'Draky',
      picture: null,
      days_left: 10,
    },
    asSearchCard: false,
    path: '',
  };

  it('should render properly', () => {
    const { container } = renderWithTheme(
      <Router><PlantCard {...defaultProps}/></Router>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the default card template with day left', () => {
    const props = {
      ...defaultProps,
      asSearchCard: false,
    };
    const { getByTestId } = renderWithTheme(
      <Router><PlantCard {...props}/></Router>,

    );
    expect(getByTestId('default-card')).toBeTruthy();
  });

  it('should render the default search card template', () => {
    const props = {
      ...defaultProps,
      asSearchCard: true,
    };
    const { getByTestId } = renderWithTheme(
      <Router><PlantCard {...props}/></Router>,

    );
    expect(getByTestId('search-card')).toBeTruthy();
  });
});
