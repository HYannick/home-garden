/** @jsx jsx */
import React from 'react';
import {jsx} from "@emotion/core";
import styled from "@emotion/styled";
import {ButtonProps} from "./Button";


interface CircularButtonProps extends ButtonProps{
  icon?: any,
  size?: string,
  withBorder?: boolean,
  disabled?: boolean
  hidden?: boolean
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export const BaseButton = styled('button')<CircularButtonProps>`
  background-color: hotPink;
  border: ${({withBorder, theme}) => withBorder ? `0.4rem solid ${theme.palette.light}` : 'none'};
  border-radius: 50px;
  outline:  ${({theme, variant}) => theme.palette[variant || 'primary'].light};
  padding: 0;
  margin: 0;
  opacity: ${({hidden}) => hidden ? 0 : 1};
  visibility: ${({hidden}) => hidden ? 'none' : 'visible'};
  transition: background-color 0.3s, opacity 0.3s, visibility 0.3s;
  svg {
    width: 15px;
    height: 15px;
    transition: fill 0.3s stroke 0.3s; 
  }
  &:disabled {
    background-color:  ${({theme}) => theme.palette.grey.light};
    svg {
      fill: ${({theme}) => theme.palette.grey.dark};
      stroke: ${({theme}) => theme.palette.grey.dark};
    }
  }
`;

const Button = styled(BaseButton)<ButtonProps>`
  background-color: ${({variant, theme}) => theme.palette[variant || 'primary'].light};
  width: 70px;
  height: 70px;
  svg {
   fill: ${({variant, theme}) => theme.palette[variant || 'primary'].dark};
   stroke: ${({variant, theme}) => theme.palette[variant || 'primary'].dark};
  }
`;

const CircularButton: React.FC<CircularButtonProps> = ({icon: Icon, variant = "primary", withBorder = false, disabled = false, onClick, hidden}: CircularButtonProps) => {
  return (
    <Button {...{variant, withBorder, onClick, disabled, hidden}}><Icon/></Button>
  );
};

export default CircularButton;
