import styled from '@emotion/styled';
import { pulse } from '../../core/utils/animations';
import { PlaceHolderProps } from './Feed.types';


export const Article = styled('a')`
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  height: 20rem;
`;
export const MediaWrapper = styled('div')`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  img {
    border-radius: 2rem;
  }
`;
export const Caption = styled('div')`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 1;
  > h4 {
    font-size: 2.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.primary.light}; 
    margin-bottom: 0;
  }
  > span {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.palette.light}; 
  }
`;
export const FeedWrapper = styled('div')`
  position: relative;
  padding: 0 2rem;
`;
export const Padding = styled('div')`
  padding: 0 0 0 2rem;
`;
export const FeedContent = styled('div')`
  position: relative;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
  }
`;



export const Placeholder = styled('div')<PlaceHolderProps>`
    border-radius: 2rem;
    background-color: ${({ variant, theme }) => theme.palette[variant || 'grey'].light};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: 900;
    color: ${({ variant, theme }) => theme.palette[variant || 'grey'].dark};
    animation: ${({ stopAnimate }) => !stopAnimate ? pulse : 'none'} 1.2s ease-in-out infinite alternate;
`;
