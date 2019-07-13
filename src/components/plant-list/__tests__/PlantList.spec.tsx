import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import PlantList from '../PlantList';

afterEach(cleanup);
describe('PlantList', () => {
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <PlantList />,
    );
    expect(container).toMatchSnapshot();
  });

});
