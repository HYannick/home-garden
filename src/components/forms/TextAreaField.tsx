/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { Label } from './Label';

interface FieldProps {
  field?: any,
  form?: any,
  placeholder?: string,
  label?: string
}

const TextArea = styled('textarea')`
  border: 0.3rem solid ${({ theme }) => theme.palette.grey.light};
  outline: ${({ theme }) => theme.palette.grey.light};
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  width: 100%;
  font-size: 1.6rem;
  min-height: 20rem;
`;


const TextAreaField: React.FC<FieldProps> = ({ field, label }) => (
  <Fragment>
    <Label htmlFor={field.name}>{label}</Label>
    <TextArea id={field.name} name={field.name} onChange={field.onChange} />
  </Fragment>
);

export default TextAreaField;
