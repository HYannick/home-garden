import React from 'react';
import {
  PieChart, Pie, Cell,
} from 'recharts';
import ImageFade from '../../components/image-fade/ImageFade';
import ActionBar from '../../layout/ActionBar';
import { minTwoDigits } from '../../core/utils/min_two_digits';

import {
  Avatar,
  ChartContainer,
  Counters,
  Padding,
  ProfileHeader, Spacer, TotalCount,
  UserDetails,
  Username,
  ViewAll,
} from './Profile.styled';
import { ProfileViewProps } from './Profile.types';


const ProfileView: React.FC<ProfileViewProps> = ({ t,userLoading, userInfos, countLoading, counters, chartData }) => {
  const COLORS = ['#B4ED86', '#EDAE86', '#ED8686'];

  if (userLoading || countLoading) {
    return <div>{t('profile_page.loading')}</div>;
  }

  return (
    <div>
      <ActionBar title="About you"/>
      <Padding>
        <ProfileHeader>
          <Avatar data-testid="avatar">
            <ImageFade src={userInfos.avatar} alt="avatar"/>
          </Avatar>
          <Username data-testid="username">
            <h2>{userInfos.username}</h2>
          </Username>
        </ProfileHeader>
        <UserDetails>
          <ChartContainer>
            <div>
              <PieChart width={200} height={200}>
                <Pie
                  data={chartData}
                  cx={95}
                  cy={95}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {
                    // eslint-disable-next-line react/no-array-index-key
                    chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
              </PieChart>
              <TotalCount data-testid="total_plants"><h4>{minTwoDigits(counters.total)}</h4><span>Plants</span></TotalCount>
            </div>
          </ChartContainer>
          <Counters data-testid="counters">
            {
              chartData.map(({ name, variant, label, value }: { name: string, variant: string, label: string, value: number }) => (
                <Counters.Block key={`${name}-counter`} variant={variant || 'primary'}>
                  <p>{minTwoDigits(value)}</p>
                  <span>{label}</span>
                </Counters.Block>
              ))
            }
          </Counters>
          <ViewAll to="/plants">View plants</ViewAll>
        </UserDetails>
        <Spacer/>
      </Padding>
    </div>
  );
};

export default ProfileView;
