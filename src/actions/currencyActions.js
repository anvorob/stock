import {FETCH_CURRENCIES,FETCH_MUTUAL_FUNDS,FETCH_STOCK_LIST} from './types';

let apiToken= 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';
let baseURI = 'https://api.worldtradingdata.com/api/v1/';
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';


export const fetchCurrencyRate=(baseCurrency = "USD")=>dispatch=>{
    
    fetch(proxyUrl+baseURI+'forex?base='+baseCurrency+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_CURRENCIES,
            baseCurrency:baseCurrency,
            payload: post
          }));
};

export const getMutualFund=(symbolArr)=>dispatch=>{
    console.log("getMutualFund");
    fetch(proxyUrl+baseURI+'mutualfund?symbol='+symbolArr.join(',')+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_MUTUAL_FUNDS,
            payload: post
          })
          );
};

export const getStockList=(symbolArr)=>dispatch=>{
    console.log("getStockList");
    fetch(proxyUrl+baseURI+'stock?symbol='+symbolArr.join(',')+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_STOCK_LIST,
            payload: post
          })
          );
};