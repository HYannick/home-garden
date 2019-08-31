import React, { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ArrowBack from '../core/svg/ArrowBack';
import Typography from '../components/Typography';

export interface ActionProps {
  key: number,
  icon: React.FC<{ fill?: string, stroke?: string }>,
  onClick: MouseEventHandler,
}

export interface ActionBarProps extends RouteComponentProps {
  title?: string,
  actions?: ActionProps[],
  children?: ReactNode
}

const ActionWrapper = styled('div')`
  display: flex;
  align-items: center;
  padding: 2rem 2rem 2rem 0;
`;

const BackButton = styled('div')`
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled('div')`
  flex: 1;
  padding-left: 2rem;
`;

const Actions = styled('div')`
  display: flex;
`;

const Action = styled('button')`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  background: transparent;
  padding: 0;
  outline: ${({ theme }) => theme.palette.light};
  margin-left: 1.5rem;
  border: none;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 0.1s;
  svg {
    width: 2.5rem;
    height: 2.5rem;
    path {
      fill: ${({ theme }) => theme.palette.grey.darker};
      stroke:  ${({ theme }) => theme.palette.grey.darker};
      stroke-width: 0.5;
    } 
  }
`;

const ActionBar: React.FC<ActionBarProps> = ({ history, title, actions }) => {
  const goBack = () => {
    history.goBack();
  };
  return (
    <ActionWrapper>
      <BackButton onClick={goBack}>
        <ArrowBack/>
      </BackButton>
      <Title>
        <Typography noMargin variant="title" weight="800">{title}</Typography>
      </Title>
      <Actions>
        {actions && actions.map(({ key, icon: Icon, onClick}: ActionProps) => (
          <Action key={key} onClick={onClick}>
            <Icon/>
          </Action>
        ))}
      </Actions>
    </ActionWrapper>
  );
};

export default withRouter(ActionBar);
