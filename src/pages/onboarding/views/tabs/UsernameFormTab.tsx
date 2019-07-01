/** @jsx jsx */
import React, {useContext} from 'react';
import {useTranslation} from "react-i18next";
import {UserContext} from '../OnBoarding';
import styled from '@emotion/styled-base';
import {css, jsx} from "@emotion/core";
import mascotImage from '../../../../core/svg/mascot-1.svg';
import {ActionType} from "../../onboarding.types";
import Typography from '../../../../components/Typography';
import {Input} from '../../../../components/FormInput';
import {useDisableNext} from "../../onboarding.hooks";

const Wrapper = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 30rem;
  width: 100%;
`;

const UsernameFormTab: React.FC = () => {
  const {t} = useTranslation();
  const {state: {username}, dispatch} = useContext(UserContext);

  const changeUsername = (e: any) => {
    dispatch({
      type: ActionType.SET_USERNAME,
      payload: {
        username: e.target.value
      }
    })
  };

  useDisableNext(username, dispatch);

  return (
    <Wrapper>
      <img css={css`
          width: 20rem;
          height: 20rem;
          margin-bottom: 2rem;
      `}
           src={mascotImage} alt="mascot"/>
      <Typography variant="title" alignment="center" weight="600">{t('onboarding.introduction')}</Typography>
      <Input aria-label="username" placeholder="Username" value={username} onChange={changeUsername}
      />
    </Wrapper>
  );
};

export default UsernameFormTab;
