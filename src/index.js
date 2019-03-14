import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import 'babel-polyfill';
import Root from './containers/Root';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

require('dotenv').config({ encoding: 'base64' });

// ReactDOM.render(<App />, document.getElementById('root'));
render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();