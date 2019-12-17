import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter, Route} from 'react-router-dom';
// import 'fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createBrowserHistory } from 'history';

export default createBrowserHistory;


ReactDOM.render(
    <HashRouter>
        <Route component={App}/>
    </HashRouter>,

document.getElementById('root'));


serviceWorker.unregister();
