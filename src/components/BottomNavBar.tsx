/** @jsx jsx */
import React, {useEffect, useState, Fragment} from 'react';
import {jsx} from "@emotion/core";
import styled from "@emotion/styled";
import Drop from "../core/svg/Drop";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import Add from "../core/svg/Add";
import Profile from '../core/svg/Profile';
import {Overlay} from "../layout/Header";
import plant from '../core/svg/green-tea.svg'

const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  cursor: pointer;
  & svg {
    width: 2.5rem;
    height: 2.5rem;
  }
  transform: rotate(${(props: any) => props.isOpen ? '45deg' : 0});
  transition: transform 0.3s;
`;

const NavWrapper = styled('div')`
  height: 7rem;
  border-radius: 5rem 5rem 0 0;
  box-shadow: 0 -0.3rem 0.6rem 0.6rem rgba(196, 196, 196, 0.15);
  background-color: white;
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
      background-color: ${(props: any) => props.theme.palette.primary.light};
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
      background-color: ${(props: any) => props.theme.palette.primary.dark};
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
        stroke: ${(props: any) => props.theme.palette.primary.dark};
      }
    }
    & svg path {
      fill: ${(props: any) => props.theme.palette.primary.dark};
      stroke: ${(props: any) => props.theme.palette.primary.dark};
      transition: fill 0.3s , stroke 0.3s;
    }
  }
`;

const OptionsWrapper = styled('div')`
  background-color: white;
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
    color:  ${(props: any) => props.theme.palette.grey.dark};
    font-weight: 600;
    font-size: 2rem;
    text-decoration: none;
  }
`;

const MainWrapper = styled('div')`
  position: fixed;
  z-index: 1;
  bottom: 0;
  width: 100%;
  transition: transform 0.3s;
  transform: translateY(${(props: any) => props.isOpen ? 0 : '8.3rem'});
  .nav__link {
    opacity: ${(props: any) => props.isOpen ? 0 : 1};
    transition: opacity 0.3s visibility 0.3s;
    pointer-events:  ${(props: any) => props.isOpen ? 'none' : 'auto'}; 
  }
`;

const AddWrapper = styled('div')`
  position: relative;
  z-index: 1;
  & svg path {
    fill: ${(props: any) => props.isOpen && props.theme.palette.danger.dark};
    transition: fill 0.3s , stroke 0.3s;
  }
  &:before {
      content : '';
      position: absolute;
      z-index: -1;
      background-color: ${(props: any) => props.theme.palette.danger.light};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(${(props: any) => props.isOpen ? 1 : 0.4});
      opacity: ${(props: any) => props.isOpen ? 1 : 0};
      width: 5rem;
      height: 5rem;
      border-radius: 5rem;
      transition: opacity 0.3s , transform 0.3s ;
  }
`;

const NavOverlay = styled(Overlay)`
  z-index: 0; 
  background-color:  ${(props: any) => props.theme.palette.grey.darker};
  opacity: ${(props: any) => props.isOpen ? 0.8 : 0};
  pointer-events: ${(props: any) => props.isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s;
`;

const Divider = styled('div')`
  width: 100%;
  height: 0.1rem;
  margin: 1rem 0;
  background-color:  ${(props: any) => props.theme.palette.grey.light};
`;

const Infos = styled('div')`
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
    color: ${(props: any) => props.theme.palette.primary.light};
    font-size: 4rem;
  }
  p {
    color: white;
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
    background-color: white;
    border-radius: 20px;
  }
`;
const BottomNavBar: React.FC<RouteComponentProps> = ({location}) => {
  const [isOpen, expand] = useState(false);

  const hide = () => expand(false);
  const toggle = () => expand(!isOpen);

  useEffect(() => {
    hide()
  }, [location]);

  if (location.pathname.match('/onboarding')) {
    return null;
  }

  const title = '';

  return (
    <Fragment>
      <MainWrapper {...{isOpen}}>
        <div>
          {
            isOpen && (
              <Infos onClick={hide}>
                <h2>Want to make the family grow?</h2>
                <p>Take a photo of your plant<br/>or search it in our database</p>
              </Infos>
            )
          }
          <NavWrapper>
            <NavLink to="/" exact activeClassName="nav__link--active" className="nav__link">
              <IconWrapper className="outlined">
                <Drop stroke="#707070" fill="none"/>
              </IconWrapper>
            </NavLink>
            <AddWrapper {...{isOpen}}>
              <IconWrapper onClick={toggle} {...{isOpen}}>
                <Add fill="#707070"/>
              </IconWrapper>
            </AddWrapper>
            <NavLink to="/profile" exact activeClassName="nav__link--active" className="nav__link">
              <IconWrapper>
                <Profile fill="#707070" stroke="#707070"/>
              </IconWrapper>
            </NavLink>
          </NavWrapper>
        </div>
        <OptionsWrapper>
          <ul>
            <li><NavLink to="/photo">Take a photo</NavLink></li>
            <li>
              <Divider/>
            </li>
            <li><NavLink to="/search">Search in library</NavLink></li>
          </ul>
        </OptionsWrapper>
      </MainWrapper>
      <NavOverlay onClick={hide} {...{title, isOpen}}/>
    </Fragment>
  );
};

export default withRouter(BottomNavBar);
