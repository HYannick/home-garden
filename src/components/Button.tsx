import styled from "@emotion/styled";

export interface ButtonProps {
  variant?: string,
  hidden?: boolean
}

export const Button = styled('button')<ButtonProps>`
  background-color:  ${({variant, theme}) => theme.palette[variant || 'primary'].light};
  color: ${({variant, theme}) => theme.palette[variant || 'primary'].dark};
  border: 0.2rem solid ${({variant, theme}) => theme.palette[variant || 'primary'].dark};
  border-radius: 3rem;
  padding: 1rem 3rem;
  font-size: 1.5rem;
  font-weight: bold;
`;
