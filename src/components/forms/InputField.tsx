/** @jsx jsx */
import React, {Fragment} from 'react';
import styled from "@emotion/styled";
import {jsx} from '@emotion/core';
import {Label} from './Label';

interface FieldProps {
  field?: any,
  form?: any,
  placeholder?: string
  label?: string,
  alignment?: string,
  type: string
}

const Input = styled('input')<{ alignment: string }>`
  border: 0.3rem solid ${({theme}) => theme.palette.grey.dark};
  outline: ${({theme}) => theme.palette.grey.light};
  padding: 1rem 2rem;
  text-align: ${({alignment}) => alignment || 'left'};
  border-radius: 1.5rem;
  width: 100%;
  font-size: 1.6rem;
`;


const InputField: React.FC<FieldProps> = ({field, label, alignment, type}) => (
  <Fragment>
    <Label htmlFor={field.name}>{label}</Label>
    <Input id={field.name} name={field.name} type={type} onChange={field.onChange} alignment={alignment || ''}/>
  </Fragment>
);

export default InputField;
