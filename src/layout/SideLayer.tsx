/** @jsx jsx */
import styled from '@emotion/styled';
import { VariantProps } from '../interfaces';

interface SideLayerProps extends VariantProps {
  fullHeight?: boolean
}

export const SideLayer = styled('div')<SideLayerProps>`
  position: absolute;
  top: 1rem;
  border-radius: 0 3rem 3rem 0;
  left: 0;
  bottom: 0;
  height: ${({ fullHeight }) => fullHeight ? 'initial' : '75rem'};
  z-index: -1;
  width: 5rem;
  background-color: ${({ theme, variant }) => theme.palette[variant || 'warning'].light};
  transition: background-color 0.3s;
`;
