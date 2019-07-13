/** @jsx jsx */
import React, { Fragment, useEffect, useState } from 'react';
import { Global, jsx } from '@emotion/core';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { globalStyles } from './global-styles';
import OnBoarding from './pages/onboarding/views/OnBoarding';
import HomeScreen from './pages/home/Home';
import BottomNavBar from './layout/bottom-nav-bar/BottomNavBar';
import PlantCreate from './pages/create/PlantCreate';
import { userStore } from './api/plants.api';
import Plant from './pages/plant/Plant';
import PlantEdit from './pages/edit/PlantEdit';

export const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const [hasUserInfos, setUserInfos] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(true);

  const getUserInfos = async (didCancel: boolean) => {
    setLoadingRoute(true);
    try {
      const userData = await userStore.getItem('user_infos');
      if (!didCancel) setUserInfos(!!userData);
      setLoadingRoute(false);
    } catch (e) {
      if (!didCancel) console.error(e);
    }
  };

  useEffect(() => {
    let didCancel = false;
    getUserInfos(didCancel);
    return function cleanup() {
      didCancel = true;
    };
  }, [hasUserInfos]);

  return <Route
    {...rest}
    render={(props) => {
      if (loadingRoute) {
        return <div>Loading ...</div>;
      }
      if (hasUserInfos) {
        return <Component {...props} />;
      }
      return <Redirect to={{
        pathname: '/onboarding',
        state: { from: props.location },
      }}/>;
    }}
  />;
};


const App: React.FC = () => {
  return (
    <Fragment>
      <Global styles={globalStyles}/>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={HomeScreen}/>
          <PrivateRoute path="/create" exact component={PlantCreate}/>
          <PrivateRoute path="/plants/:id" exact component={Plant}/>
          <PrivateRoute path="/plants/:id/edit" exact component={PlantEdit}/>
          <Route path="/onboarding" exact component={OnBoarding}/>
        </Switch>
        <BottomNavBar/>
      </Router>
    </Fragment>
  );
};

export default App;
