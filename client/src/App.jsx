import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './store'
import {Container} from 'reactstrap'

import AppNavbar from './components/AppNavbar'
import ShopingList from './components/ShopingList';
import ItemModal from './components/ItemModal';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemModal/>
          <ShopingList/>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
