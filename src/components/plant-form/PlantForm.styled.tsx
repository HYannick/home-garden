import styled from '@emotion/styled';
import { Form } from 'formik';
import ImageUpload from '../forms/ImageUpload';


export const ImageCreate = styled(ImageUpload)`
  width: calc(100% - 6.5rem);
  height: 30rem;
  margin: 1rem 0 0 4rem;
`;



export const FormCreate: any = styled(Form)`
  position: relative;
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
    top: 15rem;
    left: 30%;
    width: 20rem;
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

FormCreate.Infos = styled('p')`
  color: ${({ theme }) => theme.palette.grey.dark};
  margin: 2rem 0;
`;
