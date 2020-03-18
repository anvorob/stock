import {FETCH_CURRENCIES,FETCH_MUTUAL_FUNDS} from './types';

let apiToken= 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';
let baseURI = 'https://api.worldtradingdata.com/api/v1/';
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';


export const fetchCurrencyRate=(baseCurrency = "USD")=>dispatch=>{
    //console.log("fetching");
    //console.log(baseCurrency);
    fetch(proxyUrl+baseURI+'forex?base='+baseCurrency+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_CURRENCIES,
            baseCurrency:baseCurrency,
            payload: post
          }));
};

export const getMutualFund=(symbolArr)=>dispatch=>{
    console.log("Posting");
    fetch(proxyUrl+baseURI+'mutualfund?symbol='+symbolArr.join(',')+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_MUTUAL_FUNDS,
            payload: post
          })
          );
};