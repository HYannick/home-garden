import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './index.css';
import { ThemeProvider } from 'emotion-theming';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { theme } from './theme';
import './i18n';

Enzyme.configure({ adapter: new Adapter() });
const Main: React.FC = () => (
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
