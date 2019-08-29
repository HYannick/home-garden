/** @jsx jsx */
import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import { LevelData } from '../../pages/plant-infos-create/PlantInfosCreate.types';
import { Label } from './Label';
import ArrowSelect from '../../core/svg/ArrowSelect';

interface FieldProps {
  field?: any,
  form?: any,
  placeholder?: string,
  label?: string,
  type: string,
  selectors: { label: string, value: LevelData }[],
  defaultValue: LevelData
}

const SelectWrapper = styled('div')`
  border: 0.3rem solid ${({ theme }) => theme.palette.grey.light};
  border-radius: 1.5rem;
  max-width: 15rem;
  width: 100%;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  select {
    width: 100%;
    border: none;
    box-shadow: none;
    background: none;
    outline: ${({ theme }) => theme.palette.primary.light};
    padding: 1rem 2rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.4rem;
    -webkit-appearance: none;
  }
`;

const SelectIcon = styled('div')`
  margin-top: 0.5rem;
  margin-right: 0.8rem;
  svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: ${({ theme }) => theme.palette.grey.dark};
    }
  }
`;

const SelectField: React.FC<FieldProps> = ({ field, label, defaultValue, selectors }) => (
  <Fragment>
    <Label htmlFor={field.name}>{label}</Label>
    <SelectWrapper>
      <select
        id={field.name} name={field.name} defaultValue={defaultValue} value={field.value}
        onChange={field.onChange}>
        {
          selectors.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))
        }
      </select>
      <SelectIcon>
        <ArrowSelect/>
      </SelectIcon>
    </SelectWrapper>
  </Fragment>
);

export default SelectField;
