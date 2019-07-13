import React from 'react';
import { shallow } from 'enzyme/build';
import toJson from 'enzyme-to-json';
import ImageFade, { Media } from './ImageFade';

describe('Image Fade', () => {
  const IMAGE_PATH = 'https://images.unsplash.com/photo-1498955472675-532cdee9d6b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2151&q=80';
  const imgProps = {
    imageCached: true,
    imageLoaded: true,
    setImageCached: jest.fn(),
    setImageLoaded: jest.fn()
  };

  it('Should match snapshot when using Image Fade', () => {
    const wrapper = shallow(<ImageFade
      placeholder="linear-gradient(102deg, #8fc6dc, #8fd6dc)"
      src={IMAGE_PATH}
      {...imgProps}
      transitionDuration={0.7}
      alt="pic"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('Should match snapshot when using Image Fade with FitMode', () => {
    const wrapper = shallow(<ImageFade
      placeholder="linear-gradient(102deg, #8fc6dc, #8fd6dc)"
      fit
      src={IMAGE_PATH}
      {...imgProps}
      transitionDuration={0.7}
      alt="pic"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('Should have an image with the right src', () => {
    const wrapper = shallow(<ImageFade
      placeholder="linear-gradient(102deg, #8fc6dc, #8fd6dc)"
      src={IMAGE_PATH}
      {...imgProps}
      transitionDuration={0.7}
      alt="pic"
    />);

    expect(wrapper.find(Media).prop('src')).toEqual(IMAGE_PATH);
  });
});
