/** @jsx jsx */
import React, {useContext} from 'react';
import {useTranslation} from "react-i18next";
import {UserContext} from '../OnBoarding';
import {css, jsx} from "@emotion/core";
import Typography from '../../../../components/Typography';
import mascotImage from "../../../../core/svg/mascot-2.svg";
import ImageUpload from "../../../../components/ImageUpload";
import {ActionType} from "../../onboarding.types";
import BoardingWrapper from "../BoardingWrapper";


const AvatarFormTab: React.FC = () => {
  const {t} = useTranslation();
  const {state: {avatar, username}, dispatch} = useContext(UserContext);

  const setAvatar = (imgDataURL: string) => dispatch(
    {
      type: ActionType.SET_AVATAR,
      payload: {
        avatar: imgDataURL
      }
    }
  );

  return (
    <BoardingWrapper>
      <img css={css`
            width: 20rem;
            height: 20rem;
          `}
           src={mascotImage} alt="mascot"/>
      <Typography variant="title" alignment="center" weight="600">{t('onboarding.greetings', {username})}</Typography>
      <ImageUpload source={avatar} onImageLoaded={setAvatar}/>
      <Typography variant="body" alignment="center" weight="600">{t('onboarding.skip', )}</Typography>
    </BoardingWrapper>
  );
};

export default AvatarFormTab;
