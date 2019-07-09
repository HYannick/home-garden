/** @jsx jsx */
import styled from '@emotion/styled';
import { VariantProps } from '../interfaces';

export const SideLayer = styled('div')<VariantProps>`
  position: absolute;
  top: 1rem;
  border-radius: 0 3rem 3rem 0;
  left:0;
  bottom:0;
  z-index: -1;
  width: 5rem;
  background-color: ${({ theme, variant }) => theme.palette[variant || 'warning'].light};
`;
