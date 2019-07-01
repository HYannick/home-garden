/** @jsx jsx */
import React from 'react';
import {jsx} from "@emotion/core";
import styled from "@emotion/styled";


interface ButtonProps {
  variant?: string,
  icon?: any,
  size?: string,
  withBorder?: boolean,
  disabled?: boolean
  hidden?: boolean
  onClick?(event: any): void;
}

export const BaseButton = styled('button')`
  background-color: hotPink;
  border: ${(props: any) => props.withBorder ? '0.4rem solid white' : 'none'};
  border-radius: 50px;
  outline:  ${(props: any) => props.theme.palette[props.variant].light};
  padding: 0;
  margin: 0;
  opacity: ${(props: any) => props.hidden ? 0 : 1};
  visibility: ${(props: any) => props.hidden ? 'none' : 'visible'};
  transition: background-color 0.3s, opacity 0.3s, visibility 0.3s;
  svg {
    width: 15px;
    height: 15px;
    transition: fill 0.3s stroke 0.3s; 
  }
  &:disabled {
    background-color:  ${(props: any) => props.theme.palette.grey.light};
    svg {
      fill: ${(props: any) => props.theme.palette.grey.dark};
      stroke: ${(props: any) => props.theme.palette.grey.dark};
    }
  }
`;

const Button = styled(BaseButton)`
  background-color: ${(props: any) => props.theme.palette[props.variant].light};
  width: 70px;
  height: 70px;
  svg {
   fill: ${(props: any) => props.theme.palette[props.variant].dark};
   stroke: ${(props: any) => props.theme.palette[props.variant].dark};
  }
`;

const CircularButton: React.FC<ButtonProps> = ({icon: Icon, variant = "primary", withBorder = false, disabled = false, onClick, hidden}) => {
  return (
    <Button {...{variant, withBorder, onClick, disabled, hidden}}><Icon/></Button>
  );
};

export default CircularButton;
