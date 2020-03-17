import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Header/>
      <Body/>
    </div>
    </Provider>
  );
}

export default App;
