import styled from "@emotion/styled";

interface StyledInputProps {
  theme: {
    palette: any
  }
}

const BaseInput = styled('input')`
  text-align: center;
  border-radius: 5rem;
  font-weight: bold;
  max-width: 25rem;
  width: 100%;
  padding: 1rem;
`;

export const Input = styled(BaseInput)`
  border: 0.4rem solid ${(props: StyledInputProps) => props.theme.palette.grey.light};
  outline: ${(props: StyledInputProps) => props.theme.palette.grey.light};
`;
