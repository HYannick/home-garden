/** @jsx jsx */
import React, {Fragment} from 'react';
import styled from "@emotion/styled";
import {jsx} from '@emotion/core';
import {Label} from "./Label";

interface SwitchProps {
  field?: any,
  form?: any,
  label?: string,
  onChange: (checked: boolean) => void
}

const SwitchWrapper = styled('label')`
  position: relative;
  display: inline-block;
  width: 7rem;
  height: 3.4rem;
`;

const HiddenInput = styled('input')`
  width: 0.01rem;
  height: 0.01rem;
  opacity: 0;
  overflow: hidden; 
  position: absolute;
  z-index: -1;
  &:checked + .slider {
    background-color: ${({theme}) => theme.palette.light};
    box-shadow: 0 0 0 0.1rem ${({theme}) => theme.palette.grey.darkest};
  }
  
  &:focus + .slider {
    box-shadow: 0 0 0 0.1rem ${({theme}) => theme.palette.grey.darkest};
  }
  
  &:checked + .slider:before {
    background-color: ${({theme}) => theme.palette.primary.light};
    transform: translateX(3.6rem);
  }
`;

const Slider = styled('span')`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({theme}) => theme.palette.light};
  box-shadow: 0 0 0 0.1rem ${({theme}) => theme.palette.grey.darkest};
  transition: .3s ease;
  border-radius: 4rem;
  
  &:before {
    position: absolute;
    content: "";
    height: 2.6rem;
    width: 2.6rem;
    left: 0.4rem;
    bottom: 0.4rem;
    background-color: ${({theme}) => theme.palette.danger.light};
    box-shadow: 0 0 0 0.1rem ${({theme}) => theme.palette.grey.darkest};
    transition: .3s ease;
    border-radius: 50%;
  }
`;

const Switch: React.FC<SwitchProps> = ({field, label, onChange}) => (
  <Fragment>
    <Label htmlFor={field.name}>{label}</Label>
    <SwitchWrapper htmlFor={field.name}>
      <input type="checkbox"/>
      <HiddenInput id={field.name} name={field.name} type="checkbox" onChange={(e) => onChange(e.target.checked)}/>
      <Slider className="slider round"/>
    </SwitchWrapper>
  </Fragment>
);

export default Switch;
