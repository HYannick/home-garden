import styled from '@emotion/styled';
import { LevelData } from '../../plant-infos-create/PlantInfosCreate.types';

export const StyledPlantStats: any = styled('div')`
  margin-top: 8rem;
  margin-left: 2rem;
  padding: 2rem 3rem 2rem 1rem;
  border: 0.2rem solid ${({ theme }) => theme.palette.grey.dark};
  border-right: none;
  border-radius: 3rem 0 0 3rem;
  text-align: justify;
  position: relative;
  background-color: white;
  &:after {
    content: '';
    position: absolute;
    border-radius: 3rem 0 0 3rem;
    top:0;
    left:0;
    right:0;
    bottom:0;
    box-shadow: 0 0.8rem 0 0 ${({ theme }) => theme.palette.grey.dark};
  }
`;

StyledPlantStats.Label = styled('div')`
  position: absolute;
  right: 2rem;
  top: -2.5rem;
  background-color: ${({ theme }) => theme.palette.light};
  padding: 1rem;
  span {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.grey.dark};
  }
`;

export const Stat: any = styled('div')`
  display: flex;
`;

Stat.LevelContainer = styled('div')<{ color: string, level: LevelData }>`
  background-color: ${({ color, theme }) => color || theme.palette.grey.darkest};
  width: 8rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  border-radius: 4rem;
  .icon-drop {
    svg {
      width: 1.5rem;
      height: 1rem;
      path {
        fill: none;
        stroke: ${({ theme }) => theme.palette.light};
      }
    }
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: ${({ theme }) => theme.palette.light};
    }
  }
`;

Stat.Level = styled('div')<{ level: string }>`
  background-color: ${({ theme }) => theme.palette.grey.light};
  flex: 1;
  margin-left: 0.5rem;
  height: 0.2rem;
  > div {
    width: ${({ level }) => {
    switch (level) {
    case LevelData.LOW :
      return '25%';
    case LevelData.MEDIUM :
      return '50%';
    case LevelData.HIGH :
      return '100%';
    default:
      return '0';
    }}
};
    height: 0.2rem;
    background-color: ${({ theme }) => theme.palette.light};
  }
`;
Stat.Icon = styled('div')`
  width: 2rem;
  display: flex;
  justify-content: center;
  margin-right: 1rem;
  padding-top: 0.2rem;
  svg {
    width: 2rem;
    height: 3rem;
    g {
      fill: ${({ theme }) => theme.palette.grey.dark};
    }
  }
`;
Stat.Content = styled('div')`
  flex: 1;
`;
Stat.Header = styled('div')`
  display: flex;
  justify-content: space-between;
  h5 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.grey.dark};
  }
`;
Stat.Description = styled('p')`
  font-size: 1.6rem;
  margin: 0;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.palette.grey.dark};
`;
