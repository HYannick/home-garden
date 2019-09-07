import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserInfos } from '../../pages/home/home.hooks';
// @ts-ignore
import defaultAvatar from '../../static/default-avatar.jpeg';
import HeaderView from './Header.view';

const cover = 'https://images.unsplash.com/photo-1455793067932-146d5b4a694f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=300&q=80';

const Header: React.FC = (props) => {
  const { t } = useTranslation();
  const { userInfos: { username, avatar } } = useGetUserInfos();
  const now = new Date().toDateString();

  const viewProps = {
    ...props,
    t,
    username,
    avatarUrl: avatar || defaultAvatar,
    cover,
    now
  };
  return <HeaderView {...viewProps}/>;
};
export default Header;
