import styled from '@emotion/styled';
import { Form } from 'formik';

export const FormCreate: any = styled(Form)`
  position: relative;
  padding-bottom: 10rem;
  &:before {
    content: '';
    position: absolute;
    top: 4rem;
    left: 1.5rem;
    background-color: ${({ theme }) => theme.palette.warning.dark};
    border-radius: 40px;
    width: 1rem;
    height: 1rem;
  }
`;

FormCreate.ErrorField = styled('div')`
  padding: 1rem 0;
  color: ${({ theme }) => theme.palette.danger.dark};
`;


FormCreate.Wrapper = styled('div')`
  display: flex;
`;

FormCreate.Title = styled('div')`
  width: 5rem;
  position: relative;
  & > p {
    position: absolute;
    top: 30rem;
    left: 30%;
    width: 30rem;
    margin: 0;
    font-size: 2.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.warning.dark};
    transform: rotate(-90deg);
    transform-origin: 0 0.6rem;
  }
`;

FormCreate.Control = styled('div')`
  margin-bottom: 2rem;
`;

FormCreate.ButtonWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  button {
    flex-basis: 48%;
  }
`;

FormCreate.HelperText = styled('p')`
  color: ${({ theme }) => theme.palette.grey.dark};
  font-size: 1.8rem;
  margin: 0 0 2rem;
`;
