import {FETCH_CURRENCIES} from './types';

let apiToken= 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';
let baseURI = 'https://api.worldtradingdata.com/api/v1/';
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let baseCurrency = "USD";

export const fetchCurrencyRate=()=>dispatch=>{
    console.log("fetching");
    fetch(proxyUrl+baseURI+'forex?base='+baseCurrency+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_CURRENCIES,
            payload: post
          }));
};

export const changeCurrency=()=>dispatch=>{
    console.log("Posting");
    
};