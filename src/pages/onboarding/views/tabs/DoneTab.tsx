/** @jsx jsx */
import React from 'react';
import {useTranslation} from "react-i18next";
import {css, jsx} from "@emotion/core";
import Typography from "../../../../components/Typography";
import mascotImage from "../../../../core/svg/mascot-1.svg";
import BoardingWrapper from "../BoardingWrapper";

const DoneTab: React.FC = () => {
  const {t} = useTranslation();

  return (
    <BoardingWrapper>
      <img css={css`
              width: 20rem;
              height: 20rem;
              margin-bottom: 2rem;
          `}
           src={mascotImage} alt="mascot"/>
      <Typography variant="title" alignment="center" weight="600">{t('onboarding.done')}</Typography>
    </BoardingWrapper>
  );
};

export default DoneTab;
