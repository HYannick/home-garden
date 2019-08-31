import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../theme-wrapper';
import FeedView, { FeedViewProps } from '../Feed.view';

afterEach(cleanup);
describe('PlantList', () => {
  const feedControls = [
    {
      key: 1,
      icon: () => <div>Right</div>,
      disabled: false,
      onClick: jest.fn(),
    },
    {
      key: 2,
      icon: () => <div>Left</div>,
      disabled: false,
      onClick: jest.fn(),
    },
  ];

  const defaultProps: FeedViewProps = {
    t: jest.fn(),
    fadeTransition: [],
    articleTransition: [],
    feedControls,
    articles: [{
      id: 1,
      link: 'green-garden.com',
      picture: 'draecena.jpg',
      title: 'How to be a hero',
      source: 'green-hero.com',
    }],
    hasErrors: false,
  };
  it('should render properly', () => {
    const { container } = renderWithTheme(
      <FeedView {...defaultProps}/>,
    );
    expect(container).toMatchSnapshot();
  });
});
