import React from 'react';
import ReactDOM from '@hot-loader/react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
    React.createElement(hot(App)),
    document.getElementById('app')
);
