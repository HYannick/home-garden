/** @jsx jsx */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { UserContext } from '../OnBoarding';
import Typography from '../../../../components/Typography';
// @ts-ignore
import mascotImage from '../../../../core/svg/mascot-2.svg';
import ImageUpload from '../../../../components/forms/ImageUpload';
import { ActionType } from '../../onboarding.types';
import BoardingWrapper from '../BoardingWrapper';


const AvatarFormTab: React.FC = () => {
  const { t } = useTranslation();
  const { state: { avatar, username }, dispatch } = useContext(UserContext);

  const setAvatar = (imgDataURL: any) => dispatch(
    {
      type: ActionType.SET_AVATAR,
      payload: {
        avatar: imgDataURL.src,
      },
    },
  );

  const UploadWrapper = styled('div')`
    width: 20rem;
    height: 20rem;
  `;

  return (
    <BoardingWrapper>
      <img
        css={css`
            width: 20rem;
            height: 20rem;
         `}
        src={mascotImage} alt="mascot"/>
      <Typography variant="title" alignment="center" weight="600">{t('onboarding.greetings', { username })}</Typography>
      <UploadWrapper>
        <ImageUpload source={avatar} onImageLoaded={setAvatar} field={{ name: 'avatar' }}/>
      </UploadWrapper>
      <Typography variant="body" alignment="center" weight="600">{t('onboarding.skip')}</Typography>
    </BoardingWrapper>
  );
};

export default AvatarFormTab;
