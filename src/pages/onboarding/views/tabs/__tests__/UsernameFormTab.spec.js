import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../../../theme-wrapper';
import { UserContext } from '../../OnBoarding';
import UsernameFormTab from '../UsernameFormTab';


afterEach(cleanup);
describe('UsernameTab', () => {
  it('It should contain the right onboarding text', () => {
    const { getByText } = renderWithTheme(
      <UserContext.Provider value={{ state: { username: '' }, dispatch: jest.fn() }}>
        <UsernameFormTab/>
      </UserContext.Provider>,
    );
    expect(getByText(/^onboarding.introduction/)).toHaveTextContent('onboarding.introduction');
  });
});


