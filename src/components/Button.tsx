import styled from '@emotion/styled';

export interface ButtonProps {
  variant?: string,
  hidden?: boolean
}

export const Button = styled('button')<ButtonProps>`
  background-color:  ${({ variant, theme }) => theme.palette[variant || 'primary'].light};
  color: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  border: none;
  border-radius: 3rem;
  padding: 1rem 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  position: relative;
  outline: ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
  transition: 0.1s;
  &:disabled {
    background-color:  ${({ theme }) => theme.palette.grey.light};
    color: ${({ theme }) => theme.palette.grey.dark};
    border: 0.1rem solid ${({ theme }) => theme.palette.grey.dark};
  }
  &:active {
    transform: translateY(0.6rem);
    &:after {
      box-shadow: 0 0 0 0  ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
    }
  }
  &:after {
    content: '';
    position: absolute;
    border-radius: 3rem;
    top:0;
    left:0;
    right:0;
    bottom:0;
    box-shadow: 0 0.6rem 0 0 ${({ variant, theme }) => theme.palette[variant || 'primary'].dark};
    opacity: 0.5;
    transition: 0.1s;
  }
`;
