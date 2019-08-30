import { minTwoDigits } from './min_two_digits';

describe('minTwoDigits helper', () => {
  it('should have two digits if n < 10', () => {
    expect(minTwoDigits(1)).toEqual('01');
  });
});
