import React, { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import Typography from '../components/Typography';


interface VariantType {
  variant?: string
}

const HeadingWrapper = styled('div')<VariantType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h1 {
    font-size: 3rem;
    color: ${({ theme }) => theme.palette.grey.dark};
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color:  ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
      border:  0.2rem solid ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 1rem;
    }
  }
  & h6 {
    font-size: 1.7rem;
    color: ${({ theme }) => theme.palette.grey.light};
    margin-bottom: 2rem;
  }
`;

interface ControlsProps {
  key: number,
  disabled: boolean,
  icon: React.FC<{ fill?: string, stroke?: string }>,
  onClick: MouseEventHandler
}

interface HeadingProps {
  title: string,
  subtitle?: string,
  variant?: string,
  controls?: Array<ControlsProps>,
}

const Controls = styled('div')`
  display: flex;
  padding: 0;
  width: 9rem;
  justify-content: space-between;
`;

const Control = styled('button')`
  border: none;
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding: 1rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  outline: ${({ theme }) => theme.palette.primary.light};
  position: relative;
  transition: 0.1s;
  &:disabled {
    background-color: ${({ theme }) => theme.palette.grey.light};
    > svg path {
      fill: ${({ theme }) => theme.palette.grey.dark};
      stroke: ${({ theme }) => theme.palette.grey.dark};
      stroke-width: 5;
    }
    &:after {
      box-shadow: 0 0.6rem 0 0 ${({ theme }) => theme.palette.grey.dark};
    }
  }
  &:active {
    transform: translateY(0.6rem);
    &:after {
      box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.primary.dark};
    }
  }
  &:after {
    content: '';
    position: absolute;
    border-radius: 1rem;
    top:0;
    left:0;
    right:0;
    bottom:0;
    box-shadow: 0 0.6rem 0 0 ${({ theme }) => theme.palette.primary.dark};
    opacity: 0.5;
    transition: 0.1s;
  }
  > svg {
    width: 1.2rem;
    height: 1.2rem;
    path {
      fill: ${({ theme }) => theme.palette.primary.dark};
      stroke: ${({ theme }) => theme.palette.primary.dark};
      stroke-width: 5;
    }
  }
`;


const Heading: React.FC<HeadingProps> = ({ title, subtitle, variant = 'primary', controls }) => {
  return (
    <HeadingWrapper variant={variant}>
      <div>
        <Typography variant="title" weight="600" tag="h1" noMargin>{title}</Typography>
        <Typography variant="body" weight="400" tag="h6" noMargin>{subtitle}</Typography>
      </div>
      {
        controls && (
          <Controls>
            {controls.map(({ key, icon: Icon, onClick, disabled }) => (
              <Control key={key} onClick={onClick} disabled={disabled}>
                <Icon/>
              </Control>
            ))}
          </Controls>
        )
      }
    </HeadingWrapper>
  );
};

export default Heading;
