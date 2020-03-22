import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ExchangeRateDetails from './components/ExchangeRateDetails';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Router>
      <Provider store={store}>
      <div className="App">
        <Header/>
        <Body/>

        <Switch>
              <Route exact path='/' component={Body} />
              <Route path='/rateDetails/:currCode'  component={ExchangeRateDetails} />
        </Switch>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
