/** @jsx jsx */
import React, { useEffect, useState, Fragment } from 'react';
import { jsx } from '@emotion/core';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import Drop from '../../core/svg/Drop';
import Add from '../../core/svg/Add';
import Profile from '../../core/svg/Profile';
import {
  // AddWrapper,
  Divider,
  IconWrapper,
  Infos,
  MainWrapper,
  NavOverlay,
  NavWrapper,
  OptionsWrapper,
} from './BottomNavBar.styled';


export const BottomNavBar: React.FC<RouteComponentProps> = ({ location }) => {
  const [isOpen, expand] = useState(false);

  const hide = () => expand(false);
  // const toggle = () => expand(!isOpen);

  useEffect(() => {
    hide();
  }, [location]);

  if (
    location.pathname.match('/onboarding') ||
    location.pathname.match('/create') ||
    location.pathname.match('/plants')
  ) {
    return null;
  }

  const iconDefaultColor = '#707070';

  return (
    <Fragment>
      <MainWrapper isOpen={isOpen}>
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
                <Drop stroke={iconDefaultColor} fill="none"/>
              </IconWrapper>
            </NavLink>
            <NavLink to="/search" exact activeClassName="nav__link--active" className="nav__link no-stroke">
              <IconWrapper data-testid="add">
                <Add fill={iconDefaultColor}/>
              </IconWrapper>
            </NavLink>
            {/* <AddWrapper isOpen={isOpen}> */}
            {/*  <IconWrapper data-testid="add" onClick={toggle} isOpen={isOpen}> */}
            {/*    <Add fill={iconDefaultColor}/> */}
            {/*  </IconWrapper> */}
            {/* </AddWrapper> */}
            <NavLink to="/profile" exact activeClassName="nav__link--active" className="nav__link">
              <IconWrapper>
                <Profile fill={iconDefaultColor} stroke={iconDefaultColor}/>
              </IconWrapper>
            </NavLink>
          </NavWrapper>
        </div>
        <OptionsWrapper>
          <ul>
            <li><NavLink to="/create">Add your plant</NavLink></li>
            <li><Divider/></li>
            <li><NavLink to="/search">Search in library</NavLink></li>
          </ul>
        </OptionsWrapper>
      </MainWrapper>
      <NavOverlay onClick={hide} isOpen={isOpen}/>
    </Fragment>
  );
};

export default withRouter(BottomNavBar);
