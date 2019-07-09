import styled from '@emotion/styled';

interface OverlayProps {
  color?: string,
  opacity?: number
}

export const Overlay = styled('div')<OverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
`;
