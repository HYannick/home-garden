/** @jsx jsx */
import React, {createContext, Fragment, useEffect} from 'react';
import {jsx} from "@emotion/core";
import styled from "@emotion/styled";
import {ActionType, Directions, IStateProps, UserInfosProps} from "../onboarding.types";

import CircularButton from "../../../components/CircularButton";
import ArrowRight from "../../../core/svg/ArrowRight";
import ArrowLeft from "../../../core/svg/ArrowLeft";
import Tabs from '../../../components/Tabs';
import WelcomeTab from "./tabs/WelcomeTab";
import UsernameFormTab from "./tabs/UsernameFormTab";
import AvatarFormTab from "./tabs/AvatarFormTab";
import DoneTab from "./tabs/DoneTab";
import localForage from "localforage";
import {RouteComponentProps} from "react-router";
import {useOnBoardingHook} from '../onboarding.hooks';


const BottomNav = styled.div`
  padding: 1.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserContext = createContext<IStateProps | any>(undefined);

export const submitUserInfos = async ({username, avatar}: UserInfosProps, history: any) => {
  await localForage.setItem('userInfos', {username, avatar});
  return history.push('/')
};

const OnBoarding: React.FC<RouteComponentProps<any>> = ({history}) => {
  const pages = [
    {
      key: 'welcome',
      component: WelcomeTab
    },
    {
      key: 'name',
      component: UsernameFormTab
    },
    {
      key: 'avatar',
      component: AvatarFormTab
    },
    {
      key: 'done',
      component: DoneTab
    }
  ];

  const {loading, tab, direction, handleChange, state, dispatch} = useOnBoardingHook(pages, () => submitUserInfos(state, history));

  useEffect(() => {
    let didCancel = false;
    const getData = async () => {
      try {
        dispatch({type: ActionType.SET_LOADING, payload: {loading: true}});
        const data = await localForage.getItem('userInfos');
        if (!didCancel && !!data) {
          return history.push('/');
        }
        dispatch({type: ActionType.SET_LOADING, payload: {loading: false}});
      } catch (e) {
        if (!didCancel) console.error('An error occured', e)
      }
    };

    getData();

    return function cleanup() {
      didCancel = true;
    }
  }, [dispatch, history]);

  if (loading) {
    return <div>loading...</div>;
  }


  return (
    <Fragment>
      <UserContext.Provider value={{state, dispatch}}>
        <Tabs currentTab={tab} items={pages} direction={direction} asSlider/>
      </UserContext.Provider>
      <BottomNav>
        <div>
          <CircularButton data-testid="prev" icon={ArrowRight} withBorder variant="warning"
                          hidden={tab === 0}
                          onClick={() => handleChange(Directions.PREV)}/>
        </div>
        <div>
          <CircularButton data-testid="next" icon={ArrowLeft} withBorder disabled={state.disableNext}
                          onClick={() => handleChange(Directions.NEXT)}/>
        </div>
      </BottomNav>
    </Fragment>
  );
};

export default OnBoarding;
