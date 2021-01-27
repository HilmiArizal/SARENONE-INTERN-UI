import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './Redux/Reducer';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';


const store = createStore(Reducer, {}, applyMiddleware(ReduxThunk))


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  , document.getElementById('root')
);


serviceWorker.unregister();
