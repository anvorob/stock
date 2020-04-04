import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ExchangeRateDetails from './components/ExchangeRateDetails';
import StockDetails from './components/StockDetails';
import StockList from './components/StockList';
import MutualFundList from './components/MutualFundList';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  //var hashHistory = require('react-router').hashHistory;
  return (
    <Router>
      <Provider store={store}>
      <div className="App">
        <Header/>
        {/* <Body/> */}

        <Switch>
              <Route exact path='/' component={Body} />
              <Route path='/rateDetails/:currCode'  component={ExchangeRateDetails} />
              <Route path='/stockDetails/:symbol'  component={StockDetails} />
              <Route path='/mutualFunds'  component={MutualFundList} />
              <Route path='/stocks/:type/:symbol/:page/:limit'  component={StockList} />
              <Route path='/stocks/:type/:symbol'  component={StockList} />
             
              {/* <Router history={hashHistory} >
                <Route path="/" component={Body} />
                <Route path='/stocks/:type/:symbol/:page/:limit'  component={StockList} />
                <Route path='/stocks/:type/:symbol'  component={StockList} />
              </Router> */}
        </Switch>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
