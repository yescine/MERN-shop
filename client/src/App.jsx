import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import AppNavbar from './components/AppNavbar'
import ShopingList from './components/ShopingList';

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <ShopingList/>
    </div>
  );
}

export default App;
