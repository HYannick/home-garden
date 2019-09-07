/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import Typography from '../../components/Typography';
import { Overlay } from '../../components/Overlay';
import ImageFade from '../../components/image-fade/ImageFade';
import { Avatar, HeaderContainer, HeaderWrapper } from './Header.styled';

interface HeaderProps {
  t: Function,
  now: string,
  username: string,
  cover?: string,
  avatarUrl?: string
}

const HeaderView: React.FC<HeaderProps> = ({t, username, cover, avatarUrl, now}) => {

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Overlay color="#333" opacity={0.7}/>
        <ImageFade src={cover} alt="cover" placeholder="#EFFFE2"/>
      </HeaderContainer>
      <div css={css`
        margin-left: 3.5rem;
      `}>
        <Typography variant="subtitle" color="white" alignment="left" weight="200" tag="p" noMargin> {now}</Typography>
        <Typography variant="title" color="white" alignment="left" weight="400" tag="p" noMargin>
          {t('header.hi')},&nbsp;
          <Typography
            variant="title"
            color="#B4ED86"
            alignment="left"
            weight="600"
            tag="span"
            noMargin>{username}</Typography>
        </Typography>
      </div>

      <Avatar to="/profile">
        <ImageFade src={avatarUrl} alt="username" placeholder="#EFFFE2"/>
      </Avatar>
    </HeaderWrapper>
  );
};
export default HeaderView;
