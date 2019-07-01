/** @jsx jsx */
import styled from "@emotion/styled";
import React from "react";
import {css, jsx} from "@emotion/core";
import Typography from "../components/Typography";
import {useTranslation} from "react-i18next";

interface HeaderProps {
  username: string,
  cover?: string,
  avatarUrl?: string
}

export const Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: ${(props: any) => props.color};
  opacity: ${(props: any) => props.opacity};
`;

const Header: React.FC<HeaderProps> = ({username, cover, avatarUrl}) => {
  const {t} = useTranslation();
  const now = new Date().toDateString();
  return (
    <div css={css`
      position: relative;
      height: 8rem;
      display: flex;
      align-items: center;
    `}>
      <div css={css`
        background: url('${cover}') center center no-repeat;
        background-size: cover;
        position: absolute;
        overflow: hidden;
        border-radius: 0 0 4.5rem 4.5rem;
        top: 0;
        left:0;
        bottom:0;
        right:0;
        z-index: -1;
      `}>
        <Overlay {...{color: "#333", opacity: 0.7}}/>
      </div>
      <div css={css`
        margin-left: 3.5rem;
      `}>
        <Typography variant="subtitle" color="white" alignment="left" weight="200" tag="p" noMargin> {now}</Typography>
        <Typography variant="title" color="white" alignment="left" weight="400" tag="p" noMargin>
          {t('header.hi')},&nbsp;
          <Typography variant="title" color="#B4ED86" alignment="left" weight="600" tag="span"
                      noMargin>{username}</Typography>
        </Typography>
      </div>

      <div css={css`
        background: url('${avatarUrl}') center center no-repeat;
        background-size: cover;
        border-radius: 2.5rem;
        width: 8rem;
        height: 8rem;
        border: 0.5rem solid white;
        position: absolute;
        right: 1.5rem;
        bottom: -4rem;
      `}/>
    </div>

  )
}
export default Header
