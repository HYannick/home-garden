import React, { MouseEventHandler } from 'react';
import styled from '@emotion/styled-base';

interface ButtonExpanderProps {
  defaultIcon: React.FC<{ fill?: string, stroke?: string }>,
  expandedIcon: React.FC<{ fill?: string, stroke?: string }>,
  onClick: MouseEventHandler,
  isExpanded: boolean,
  label: string,
  variant?: string,
  withBorder?: boolean,
  disabled?: boolean,
}

export interface ButtonProps {
  variant?: string,
  isExpanded?: boolean,
  withBorder?: boolean,
  disabled?: boolean
}

const Wrapper = styled('button')<ButtonProps>`
  position: relative;
  overflow: hidden;
  background-color: ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
  width: ${({ isExpanded }) => isExpanded ? '18rem' : '7rem'};
  height: 7rem;
  border-radius: 10rem;
  transition: width 0.3s, background-color 0.3s;
  border:none;
  padding: 0;
  outline: ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
  svg {
   width: 1.5rem;
   height: 1.5rem;
   fill: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
   stroke: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
   transition: fill 0.3s, stroke 0.3s;
  }
  &:disabled {
    background-color:  ${({ theme }) => theme.palette.grey.light};
    svg {
      fill: ${({ theme }) => theme.palette.grey.dark};
      stroke: ${({ theme }) => theme.palette.grey.dark};
    }
  }
`;

const Collapsed = styled('div')<ButtonProps>`
  width: 7rem;
  height: 7rem;
  border: ${({ withBorder, theme }) => withBorder ? `0.4rem solid ${theme.palette.light}` : 'none'};
  background: ${({ variant, disabled, theme }) => disabled ? theme.palette.grey.light : theme.palette[variant || 'primary'].light};
  border-radius: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;
const Expanded = styled('div')<ButtonProps>`
  width: 100%;
  height: 100%;
  position: absolute;
  border: ${({ withBorder, theme }) => withBorder ? `0.4rem solid ${theme.palette.light}` : 'none'};
  background:  ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
  color: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem;
  top: 0;
  right: 0;
  z-index: 0;
  font-weight: bold;
  font-size: 1.4rem;
  border-radius: 10rem;
`;

const ButtonExpander: React.FC<ButtonExpanderProps> = ({ defaultIcon: DefaultIcon, disabled, expandedIcon: ExpandedIcon, label, withBorder,  isExpanded, variant, onClick }) => {
  return (
    <Wrapper className="expander" isExpanded={isExpanded} disabled={disabled} variant={variant} onClick={onClick}>
      <Collapsed className="expand" withBorder={withBorder} disabled={disabled} variant={variant}>
        {!isExpanded ? <DefaultIcon/> : <ExpandedIcon/>}
      </Collapsed>
      <Expanded className="sub-expand"  withBorder={withBorder} variant={variant}>{label}</Expanded>
    </Wrapper>
  );
};

export default ButtonExpander;
