import React from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderWithTheme } from '../../../../../theme-wrapper';
import { UserContext } from '../../OnBoarding';
import WelcomeTab from '../WelcomeTab';


afterEach(cleanup);
describe('WelcomeTab', () => {
  test('It should contain the right onboarding text', () => {
    const { getByText } = renderWithTheme(
      <UserContext.Provider value={{ state: null, dispatch: jest.fn() }}>
        <WelcomeTab/>
      </UserContext.Provider>,
    );
    expect(getByText(/^onboarding.welcome/)).toHaveTextContent('onboarding.welcome');
  });

});
