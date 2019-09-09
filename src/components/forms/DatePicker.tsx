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

interface LocalesProps {
  [en: string]: {
    months: string[],
    weekday_long: string[],
    weekday_short: string[],
  },

  fr: {
    months: string[],
    weekday_long: string[],
    weekday_short: string[],
  }
}

const locales: LocalesProps = {
  en: {
    months: [
      'January',
      'February',
      'Mars',
      'April',
      'May',
      'Jun',
      'July',
      'August',
      'September',
      'October',
      'November',
      'Décember',
    ],
    weekday_long: [
      'Monday',
      'Tuestday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    weekday_short: [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ],
  },
  fr: {
    months: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    weekday_long: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    weekday_short: [
      'Lun',
      'Mar',
      'Mer',
      'Jeu',
      'Ven',
      'Sam',
      'Dim',
    ],
  },
};


const DatePicker: React.FC<DateProps> = ({ field, label, onDateSelected }) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(field.value));
  const lang = window.localStorage.getItem('lang') || 'fr';
  const handleDateClick = (day: Date, { selected }: DayModifiers) => {
    if (selected) {
      setSelectedDay(undefined);
      onDateSelected('');
      return;
    }
    setSelectedDay(day);
    onDateSelected(day);
  };
  const { months, weekday_long, weekday_short } = locales[lang];
  return (
    <Fragment>
      <Label htmlFor={field.name}>{label}</Label>
      <StyledDayPicker
        locale={lang}
        months={months}
        weekdaysLong={weekday_long}
        weekdaysShort={weekday_short}
        disabledDays={{ after: new Date() }}
        onDayClick={handleDateClick}
        selectedDays={selectedDay}/>
    </Fragment>
  );
};

export default DatePicker;
