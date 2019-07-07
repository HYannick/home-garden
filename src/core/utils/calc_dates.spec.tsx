import dateFns from 'date-fns';
import { getDaysLeft } from './calc_dates';

describe('Date calc', () => {
  it('should get remaining days', () => {
    const lastWateringDate = dateFns.format(new Date());
    const frequency = 3;
    expect(getDaysLeft(lastWateringDate, frequency)).toEqual(3);
  });
});
