import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import ImageUpload from '../ImageUpload';

afterEach(cleanup);
describe('ImageUpload', () => {
  const props = {
    field: {
      name: 'puke',
      onChange: jest.fn(),
    },
    type: 'text',
    label: 'Should I puke?',
    onImageLoaded: jest.fn()
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <ImageUpload {...props}/>,
    );
    expect(container).toMatchSnapshot();
  });
});
