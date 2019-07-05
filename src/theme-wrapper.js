import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';

function wrapWithTheme(fn, children, options) {
  return fn(
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>,
    options,
  );
}

export function renderWithTheme() {
  return wrapWithTheme(render, ...arguments);
}
