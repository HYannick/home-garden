import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserInfos } from '../home/home.hooks';
import { useGetPlantsCount } from './Profile.hooks';

import ProfileView from './Profile.view';
import { ChartItemProps, ProfileViewProps } from './Profile.types';

const Profile: React.FC = (props) => {
  const { t } = useTranslation();

  const { loading: userLoading, userInfos } = useGetUserInfos();
  const { loading: countLoading, counters } = useGetPlantsCount();

  const chartData: ChartItemProps[] = [
    { name: 'healthy', label: 'Healthy', variant: 'primary', value: counters.healthy },
    { name: 'warning', label: 'Warning', variant: 'warning', value: counters.warning },
    { name: 'needy', label: 'Needy', variant: 'danger', value: counters.danger },
  ];

  const viewProps: ProfileViewProps = {
    ...props,
    t,
    userLoading,
    countLoading,
    userInfos,
    chartData,
    counters,
  };

  return <ProfileView {...viewProps}/>;
};

export default Profile;
