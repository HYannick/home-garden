/** @jsx jsx */
import React, {useContext, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {css, jsx} from "@emotion/core";
import Typography from "../../../../components/Typography";
import mascotImage from "../../../../core/svg/mascot-1.svg";
import {ActionType} from "../../onboarding.types";
import {UserContext} from "../OnBoarding";
import BoardingWrapper from "../BoardingWrapper";


const WelcomeTab: React.FC = () => {
  const {t} = useTranslation();
  const {dispatch} = useContext(UserContext);

  useEffect(() => {
    dispatch({type: ActionType.DISABLE_NEXT, payload: {disableNext: false}});
  }, [dispatch]);

  return (
    <BoardingWrapper>
      <img css={css`
              width: 20rem;
              height: 20rem;
              margin-bottom: 2rem;
          `}
           src={mascotImage} alt="mascot"/>
      <Typography variant="subtitle" alignment="center" weight="600">{t('onboarding.welcome')}</Typography>
    </BoardingWrapper>
  );
};

export default WelcomeTab;
