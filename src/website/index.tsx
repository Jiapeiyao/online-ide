import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
import './index.less';


ReactDOM.render(
    React.createElement(hot(App)),
    document.getElementById('ide')
);