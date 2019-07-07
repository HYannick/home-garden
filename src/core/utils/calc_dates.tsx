import dateFns from 'date-fns';
import addDays from 'date-fns/add_days';
import difference from 'date-fns/difference_in_calendar_days';

export const getDaysLeft = (last_watering_date: string, frequency: number) => {
  const now: any = dateFns.format(new  Date());
  const next_watering_date = addDays(last_watering_date, frequency);
  const days_left = difference(next_watering_date, now);
  return days_left > 0 ? days_left : 0;
};
