import React, { useReducer, useState } from 'react';
import 'jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import OnBoarding from './OnBoarding';
import { renderWithTheme } from '../../../theme-wrapper';
import boardingReducer, { initialState } from '../onboarding.reducer';


afterEach(cleanup);
describe('OnBoarding', () => {
  test('It should contain the loading component on loading', async () => {
    const { result } = renderHook(() => useReducer(boardingReducer, initialState));
    const [dispatch] = result.current;
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
  test('It should contain the right onboarding text', () => {
    const { result: tabResult } = renderHook(() => useState(0));
    const { result: loadingResult } = renderHook(() => useState(false));

    const tab = tabResult.current;

    const props = {
      history: jest.fn(),
      location: jest.fn(),
      match: jest.fn(),
    };
    const { getByTestId } = renderWithTheme(<OnBoarding {...props}/>);
    const prevButton = getByTestId('prev');
    const nextButton = getByTestId('next');
    fireEvent.click(nextButton);
    console.log(nextButton);
  });

});
