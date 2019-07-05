import React, { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import ArrowBack from '../core/svg/ArrowBack';
import Typography from '../components/Typography';

interface ActionProps {
  key: number,
  icon: React.FC<{ fill?: string, stroke?: string }>,
  onClick: MouseEventHandler
}

interface ActionBarProps extends RouteComponentProps {
  title: string,
  actions?: Array<ActionProps>,
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
  
`;

const Action = styled('button')`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  outline: ${({ theme }) => theme.palette.light};
  margin-left: 1.5rem;
`;

const ActionBar: React.FC<ActionBarProps> = ({ title, actions }) => {
  return (
    <ActionWrapper>
      <BackButton>
        <NavLink to="/"><ArrowBack/></NavLink>
      </BackButton>
      <Title>
        <Typography noMargin variant="title" weight="800">{title}</Typography>
      </Title>
      <Actions>
        {actions && actions.map(({ key, icon: Icon, onClick }: ActionProps) => (
          <Action key={key} onClick={onClick}>
            <Icon fill="#4A4A4A"/>
          </Action>
        ))}
      </Actions>
    </ActionWrapper>
  );
};

export default withRouter(ActionBar);
