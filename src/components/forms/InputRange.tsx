/** @jsx jsx */
import React, {Fragment, useState} from 'react';
import styled from "@emotion/styled";
import {jsx} from '@emotion/core';
import {Range, getTrackBackground} from "react-range";

interface RangeProps {
  field?: any,
  form?: any,
  label?: string,
  min: number,
  max: number,
  step: number,
  onChange: Function
}

interface RailProps {
  isDragged: boolean
}

const FrequencyLabel = styled('label')`
  font-size: 1.6rem;
  color: ${({theme}) => theme.palette.grey.dark};
`;

const Rail = styled('div')`
  height: 3.6rem;
  display: flex;
  width: 100%;
`;

const Track = styled('div')`
  height: 1.2rem;
  width: 100%;
  box-shadow: 0 0 0 0.3rem ${({theme}) => theme.palette.grey.dark};
  border-radius: 2rem;
  background: ${({values, theme, min, max}: any) => (
  getTrackBackground({
    values,
    colors: [theme.palette.primary.light, theme.palette.light],
    min,
    max
  })
)};
  align-self: center
`;

const Thumb = styled('div')<RailProps>`
  z-index: 1 !important;
  height: 3rem;
  width: 2.5rem;
  border-radius: 0.4rem;
  background-color: ${({isDragged, theme}) => isDragged ? theme.palette.grey.dark : theme.palette.light}; 
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
  box-shadow: 0 0 0 0.3rem ${({theme}) => theme.palette.grey.dark};
  color:  ${({isDragged, theme}) => isDragged ? theme.palette.light : theme.palette.grey.dark};
`;

const Tips = styled('span')`
  color: ${({theme}) => theme.palette.grey.light};
  position: absolute;
  bottom: -1rem;
  right: 0;
`;

const RangeWrapper = styled('div')`
  margin: 2rem 1.2rem;
  position: relative;
`;

const MinMax = styled('div')`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0.5rem;
  font-size: 1rem;
`;

const InputRange: React.FC<RangeProps> = ({field, min, max, step, onChange}) => {
  const [values, setValues] = useState<number[]>([min]);

  const changeValues = (values: number[]) => {
    setValues(values);
    onChange(values[0])
  };

  return (
    <Fragment>
      <FrequencyLabel htmlFor={field.name}>What will your <strong>watering frequency</strong> be?</FrequencyLabel>
      <RangeWrapper>
        <Range
          values={values}
          min={min}
          max={max}
          step={step}
          onChange={changeValues}
          renderTrack={({props, children}) => (
            <Rail onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}>
              <Track ref={props.ref} {...props} {...{values, min, max}}>{children}</Track>
            </Rail>
          )}
          renderThumb={({props, isDragged}) => (
            <Thumb{...props} isDragged={isDragged}>
              {props["aria-valuenow"]}
            </Thumb>
          )}
        />
        <MinMax>
          <span>{min}</span>
          <span>{max}</span>
        </MinMax>
        <Tips>in days</Tips>
      </RangeWrapper>
    </Fragment>
  );
};

export default InputRange;
