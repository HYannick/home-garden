/** @jsx jsx */
import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { Label } from './Label';
import '../../static/date-picker.styles.css';

interface DateProps {
  field?: any,
  label?: string,
  onDateSelected: any
}

const StyledDayPicker = styled(DayPicker)`
    font-size: 1.5rem;
    outline: white;
    width: 100%;
    border: 0.5rem solid ${({ theme }) => theme.palette.primary.light};
    border-radius: 1rem;
    padding: 1rem;
`;

const DatePicker: React.FC<DateProps> = ({ field, label, onDateSelected }) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  const handleDateClick = (day: Date, { selected }: DayModifiers) => {
    if (selected) {
      setSelectedDay(undefined);
      onDateSelected('');
      return;
    }
    setSelectedDay(day);
    onDateSelected(day);
  };

  return (
    <Fragment>
      <Label htmlFor={field.name}>{label}</Label>
      <StyledDayPicker disabledDays={{ before: new Date() }} onDayClick={handleDateClick} selectedDays={selectedDay}/>
    </Fragment>
  );
};

export default DatePicker;
