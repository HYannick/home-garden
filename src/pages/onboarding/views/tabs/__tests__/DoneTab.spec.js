import React from 'react'
import 'jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import DoneTab from '../DoneTab'
import { renderWithTheme } from "../../../../../theme-wrapper";

afterEach(cleanup);
describe('DoneTab', () => {
  it('It should contain the right onboarding text', () => {
    const { getByText } = renderWithTheme(<DoneTab />);
    expect(getByText(/^onboarding.done/)).toHaveTextContent('onboarding.done')
  });
});


