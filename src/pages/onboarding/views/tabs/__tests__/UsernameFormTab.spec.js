import React, { useReducer } from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { renderWithTheme } from '../../../../../theme-wrapper';
import { UserContext } from '../../OnBoarding';
import UsernameFormTab from '../UsernameFormTab';
import boardingReducer, { initialState } from '../../../onboarding.reducer';


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

  it('It should set the username to the reducer', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useReducer(boardingReducer, initialState));
    const [state, dispatch] = result.current;

    await act(() => {
      const { getByLabelText } = renderWithTheme(
        <UserContext.Provider value={{ state, dispatch }}>
          <UsernameFormTab/>
        </UserContext.Provider>,
      );
      const input = getByLabelText('username');
      fireEvent.change(input, { target: { value: 'Arya Stark' } });
      waitForNextUpdate().then((e) => console.log(e, state));

      expect(state.username).toBe('Arya Stark');
    });


  });
});


