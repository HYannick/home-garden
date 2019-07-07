import React, { useReducer } from 'react';
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { renderWithTheme } from '../../../theme-wrapper';
import boardingReducer, { initialState } from '../onboarding.reducer';
import OnBoarding from './OnBoarding';


afterEach(cleanup);
describe('OnBoarding', () => {
  test('It should contain the loading component on loading', async () => {
    const { result } = renderHook(() => useReducer(boardingReducer, initialState));
    const [, dispatch] = result.current;
    const props = {
      history: jest.fn(),
      location: jest.fn(),
      match: jest.fn(),
    };

    const { getByText } = renderWithTheme(<OnBoarding {...props}/>);

    act(() => {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      expect(getByText(/^loading/)).toHaveTextContent('loading');
    });
  });
});
