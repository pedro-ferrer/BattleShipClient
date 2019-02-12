// Package dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Local dependencies
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Styles
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
