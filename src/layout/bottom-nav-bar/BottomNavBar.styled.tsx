import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { Overlay } from '../Header';
// @ts-ignore
import plant from '../../core/svg/green-tea.svg';

interface BottomNavBarProps {
  isOpen?: boolean
}

interface NavOverlayProps extends BottomNavBarProps {
  onClick: MouseEventHandler,
}

export const IconWrapper = styled('div')<BottomNavBarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  cursor: pointer;
  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  transform: rotate(${({ isOpen }) => isOpen ? '45deg' : 0});
  transition: transform 0.3s;
`;

export const NavWrapper = styled('div')`
  height: 7rem;
  border-radius: 5rem 5rem 0 0;
  box-shadow: 0 -0.3rem 0.6rem 0rem rgba(196, 196, 196, 0.15);
  background-color: ${({ theme }) => theme.palette.light};
  display: flex;
  align-items: center;
  justify-content: space-between; 
  & > * {
   flex: 1;
  }
  & > .nav__link {
    position: relative;
    z-index: 1;
    transition: opacity 0.3s;
    &:before {
      content : '';
      position: absolute;
      z-index: -1;
      background-color: ${({ theme }) => theme.palette.primary.light};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.6);
      opacity: 0;
      width: 5rem;
      height: 5rem;
      border-radius: 5rem;
      transition: opacity 0.3s , transform 0.3s ;
    }
    &:after {
      content : '';
      position: absolute;
      left: 50%;
      bottom: 0.8rem;
      opacity: 0;
      z-index: 1;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 5rem;
      background-color: ${({ theme }) => theme.palette.primary.dark};
      transform: translateX(-50%);
      transition: opacity 0.3s , transform 0.3s ;
    }
  }
  & > .nav__link--active {
    &:before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    &:after {
      opacity: 1;
    }
    & .outlined {
      & svg path {
        fill: none;
        stroke: ${({ theme }) => theme.palette.primary.dark};
      }
    }
    & svg path {
      fill: ${({ theme }) => theme.palette.primary.dark};
      stroke: ${({ theme }) => theme.palette.primary.dark};
      transition: fill 0.3s , stroke 0.3s;
    }
  }
`;

export const OptionsWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.light};
  & ul {
    margin: 0 auto;
    padding: 0 2rem 1rem;
    max-width: 30rem;
  }
  
  & li {
    list-style: none;
    text-align: center;
  }
  
  a {
    color:  ${({ theme }) => theme.palette.grey.dark};
    font-weight: 600;
    font-size: 2rem;
    text-decoration: none;
    display: block;
    padding: 1rem;
  }
`;

export const MainWrapper = styled('div')<BottomNavBarProps>`
  position: fixed;
  z-index: 1;
  bottom: 0;
  width: 100%;
  transition: transform 0.3s;
  transform: translateY(${({ isOpen }) => isOpen ? 0 : '12.3rem'});
  .nav__link {
    opacity: ${({ isOpen }) => isOpen ? 0 : 1};
    transition: opacity 0.3s visibility 0.3s;
    pointer-events:  ${({ isOpen }) => isOpen ? 'none' : 'auto'}; 
  }
`;


export const AddWrapper = styled('div')<BottomNavBarProps>`
  position: relative;
  z-index: 1;
  & svg path {
    fill: ${({ isOpen, theme }) => isOpen && theme.palette.danger.dark};
    transition: fill 0.3s , stroke 0.3s;
  }
  &:before {
      content : '';
      position: absolute;
      z-index: -1;
      background-color: ${({ theme }) => theme.palette.danger.light};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(${({ isOpen }) => isOpen ? 1 : 0.4});
      opacity: ${({ isOpen }) => isOpen ? 1 : 0};
      width: 5rem;
      height: 5rem;
      border-radius: 5rem;
      transition: opacity 0.3s , transform 0.3s ;
  }
`;

export const NavOverlay = styled(Overlay)<NavOverlayProps>`
  position: fixed;
  z-index: 0; 
  background-color:  ${({ theme }) => theme.palette.grey.darker};
  opacity: ${({ isOpen }) => isOpen ? 0.8 : 0};
  pointer-events: ${({ isOpen }) => isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s;
`;

export const Divider = styled('div')`
  width: 100%;
  height: 0.1rem;
  margin: 1rem 0;
  background-color:  ${({ theme }) => theme.palette.grey.light};
`;

export const Infos = styled('div')`
  position: relative;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;
    &:before {
    content: url(${plant});
    width: 8rem;
    height: 8rem;
    position: absolute;
    bottom: -1rem;
    right: 2rem;
  }
  h2 {
    color: ${({ theme }) => theme.palette.primary.light};
    font-size: 4rem;
  }
  p {
    color: ${({ theme }) => theme.palette.light};
    font-size: 1.5rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10rem;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.palette.light};
    border-radius: 2rem;
  }
`;
