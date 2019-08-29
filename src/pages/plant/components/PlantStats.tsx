/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Divider } from '../../../layout/bottom-nav-bar/BottomNavBar.styled';
import { StatsTypes } from '../Plant.types';
import { StyledPlantStats, Stat } from './PlantStats.styled';

interface PlantStatsProps {
  stats: StatsTypes[]
}

const PlantStats: React.FC<PlantStatsProps> = ({ stats }) => (
  <StyledPlantStats>
    <StyledPlantStats.Label><span>Informations</span></StyledPlantStats.Label>
    {
      stats.map(({ icon: Icon, title, description, level, color }, i) => {
        return (
          <Stat key={i}>
            <Stat.Icon><Icon/></Stat.Icon>
            <Stat.Content>
              <Stat.Header>
                <h5>{title}</h5>
                {
                  level && (
                    <Stat.LevelContainer color={color}>
                      <Icon/>
                      <Stat.Level level={level}>
                        <div/>
                      </Stat.Level>
                    </Stat.LevelContainer>
                  )
                }
              </Stat.Header>
              <Stat.Description>
                {description}
              </Stat.Description>
              {i < 3 && <Divider/>}
            </Stat.Content>
          </Stat>
        );
      })
    }
  </StyledPlantStats>
);

export default PlantStats;
