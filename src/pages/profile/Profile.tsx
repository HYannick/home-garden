import React from 'react';
import styled from '@emotion/styled';
import {
  PieChart, Pie, Cell,
} from 'recharts';
import { NavLink } from 'react-router-dom';
import { useGetUserInfos, useGetPlantsCount } from '../home/home.hooks';
import { VariantProps } from '../../interfaces';
import ImageFade from '../../components/image-fade/ImageFade';
import ActionBar from '../../layout/ActionBar';

const ProfileHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Username = styled('div')`
  background-color:  ${({ theme }) => theme.palette.light};
  border-radius: 2rem 0 0 4rem;
  padding: 0 2rem;
  max-width: 15rem;
  h2 {
    font-size: 3rem;
    font-weight: bold;
    color:  ${({ theme }) => theme.palette.grey.dark};
  }
`;
const Avatar = styled('div')`
  width: 28rem;
  height: 28rem;
  border-radius: 4rem;
  overflow: hidden;
`;
const UserDetails = styled('div')``;

const Counters: any = styled('div')`
  display: flex;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border-radius: 4rem;
`;

Counters.Block = styled('div')<VariantProps>`
  flex: 1;
  color: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  text-align: center;
  p {
  font-size: 4.5rem;
  margin: 0 0 1rem;
  font-weight: 900;
  }
  span {
  font-size: 1.4rem;
  opacity: 0.7;
  }
`;

const Spacer = styled('h4')`
  height: 10rem;
`;

const Padding = styled('div')`
  padding: 0 2rem;
`;

const ChartContainer = styled('div')`
  max-width: 20rem;
  margin: 0 auto;
  width: 100%;
  > div {
    position: relative;
    display: flex;
  }
`;

const TotalCount = styled('div')`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h4 {
    font-size:  5rem;
    margin: 0;
    color: ${({ theme }) => theme.palette.grey.darker};
  }
  span {
     color: ${({ theme }) => theme.palette.grey.dark};
  }
`;

const ViewAll = styled(NavLink)`
  display: flex;
  width: 70%;
  margin: 1rem auto 0;
  align-items: center;
  justify-content: center;
  border: 0.2rem solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 2rem 2rem 4rem 4rem;
  color: ${({ theme }) => theme.palette.primary.dark};
  padding: 1rem 1.5rem;
  text-decoration: none;
  font-weight: bold;
`;

function minTwoDigits(n: number) {
  return (n < 10 ? '0' : '') + n;
}

const Profile = () => {
  const { loading: userLoading, userInfos } = useGetUserInfos();
  const { loading: countLoading, counters } = useGetPlantsCount();

  const chartData = [
    { name: 'healthy', label: 'Healthy', variant: 'primary', value: counters.healthy },
    { name: 'warning', label: 'Warning', variant: 'warning', value: counters.warning },
    { name: 'needy', label: 'Needy', variant: 'danger', value: counters.danger },
  ];
  const COLORS = ['#B4ED86', '#EDAE86', '#ED8686'];

  if (userLoading || countLoading) {
    return <div>Getting data ...</div>;
  }
  return (
    <div>
      <ActionBar title="About you"/>
      <Padding>
        <ProfileHeader>
          <Avatar>
            <ImageFade src={userInfos.avatar} alt="avatar"/>
          </Avatar>
          <Username>
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
              <TotalCount><h4>{minTwoDigits(counters.total)}</h4><span>Plants</span></TotalCount>
            </div>
          </ChartContainer>
          <Counters>
            {
              chartData.map(({ name, variant, label, value }: {name: string, variant: string, label: string, value: number}) => (
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

export default Profile;
