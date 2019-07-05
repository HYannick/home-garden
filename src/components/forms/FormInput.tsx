import styled from '@emotion/styled';

const BaseInput = styled('input')`
  text-align: center;
  border-radius: 5rem;
  font-weight: bold;
  max-width: 25rem;
  width: 100%;
  padding: 1rem;
`;

export const Input = styled(BaseInput)`
  border: 0.4rem solid ${({ theme }) => theme.palette.grey.light};
  outline: ${({ theme }) => theme.palette.grey.light};
`;
