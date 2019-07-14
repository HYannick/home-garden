/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

interface ContainerProps {
  placeholder: string
}

const Container = styled('div')<ContainerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-color: ${({ placeholder }) => placeholder};
`;

interface MediaProps {
  fit?: boolean,
  imageLoaded: boolean,
  imageCached: boolean,
  transitionDuration?: number
}

export const Media = styled('img')<MediaProps>`
  width: ${({ fit }) => fit ? '100%' : 'initial'};
  height: 100%;
  object-fit:cover;
  opacity: ${({ imageLoaded }) => imageLoaded ? 1 : 0};
  transition: ${({ transitionDuration }) => `opacity ${transitionDuration}s`};
`;

export const ImageFade: React.FC<any> = ({ alt, src, placeholder = '#fff', transitionDuration = 0.3, fit = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageCached, setImageCached] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    setImageCached(image.complete);
  }, [src]);

  const imageLoadHandler = () => setImageLoaded(true);


  return (
    <Container placeholder={placeholder}>
      <Media
        fit={fit}
        alt={alt}
        src={src}
        imageLoaded={imageLoaded}
        imageCached={imageCached}
        transitionDuration={transitionDuration}
        onLoad={imageLoadHandler}
      />
    </Container>
  );
};

export default ImageFade;
