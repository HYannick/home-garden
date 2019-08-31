import styled from '@emotion/styled-base';

// eslint-disable-next-line no-undef
const Spacer = styled('div')<{ height: number }>`
  height: ${({ height }) => height || 0}rem;
`;

export default Spacer;
