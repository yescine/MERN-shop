import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './store'

import AppNavbar from './components/AppNavbar'
import ShopingList from './components/ShopingList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <ShopingList/>
      </div>
    </Provider>
  );
}

export default App;
