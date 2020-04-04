import {FETCH_CURRENCIES,
    FETCH_MUTUAL_FUNDS,
    FETCH_STOCK_LIST,
    FETCH_STOCK_HISTORY,
    FETCH_STOCK_INTRADAY,
    FETCH_SECTOR_DATA,
    FETCH_CURRENCY_HIST_DATA,
    FETCH_NEWS_FEED} from './types';

let apiToken= 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';
let baseURI = 'https://api.worldtradingdata.com/api/v1/';
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

let alphaAPI = 'https://www.alphavantage.co/query?function=SECTOR&apikey=';
let alphaToken = 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';

let newsFeedurl = 'http://newsapi.org/v2/everything?q=';
let newsFeedApiKey = '9bf84d97d40e4092bcc51bae5ad83004';
//#region Currency
export const fetchCurrencyHistoryRate=(baseCurrency = "USD", toCurrency="NZD")=>dispatch=>{
    console.log(baseCurrency,toCurrency)
    fetch(proxyUrl+baseURI+'forex_history?base='+baseCurrency+'&convert_to='+toCurrency+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_CURRENCY_HIST_DATA,
            baseCurrency:baseCurrency,
            payload: post
          }));
};

export const fetchCurrencyRate=(baseCurrency = "USD")=>dispatch=>{
    
    fetch(proxyUrl+baseURI+'forex?base='+baseCurrency+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_CURRENCIES,
            baseCurrency:baseCurrency,
            payload: post
          }));
};

//#endregion

//#region Mutual fund
export const getMutualFund=(symbolArr)=>dispatch=>{
    console.log("getMutualFund");
    fetch(proxyUrl+baseURI+'mutualfund?symbol='+symbolArr.join(',')+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_MUTUAL_FUNDS,
            payload: post
          })
          );
};
//#endregion

//#region Ticker begin

export const getStockList=(symbolArr)=>dispatch=>{
    console.log("getStockList");
    fetch(proxyUrl+baseURI+'stock?symbol='+symbolArr.join(',')+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_STOCK_LIST,
            payload: post
          })
          );
};

export const getStockHistoricalData=(symbolArr)=>dispatch=>{
    console.log("getStockHistory");
    fetch(proxyUrl+baseURI+'history?symbol='+symbolArr+'&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_STOCK_HISTORY,
            payload: post
          })
          );
};

export const getStockIntradayData=(symbolArr)=>dispatch=>{
    console.log("getStockIntraday");
    fetch(proxyUrl+baseURI+'intraday?symbol='+symbolArr+'&interval=1&range=1&api_token='+apiToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_STOCK_INTRADAY,
            payload: post
          })
          );
};
//#endregion

export const getSectorData=()=>dispatch=>{
    console.log("getSectorData");
    fetch(proxyUrl+alphaAPI+alphaToken)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_SECTOR_DATA,
            payload: post
          })
          );
};

export const getNewsFeed=(searchWords)=>dispatch=>{
    console.log("getNewsFeed");
    var d = new Date();
    var m = d.getMonth();
    d.setMonth(d.getMonth() - 1);
    let dateFrom  = d.toISOString().slice(0,10);
    // If still in same month, set date to last day of 
    // previous month
    if (d.getMonth() == m) d.setDate(0);

    //top-headlines?country=nz&category=business

    fetch(proxyUrl+newsFeedurl+searchWords.join(' OR ')+"&from="+dateFrom+"&page=2&sortBy=publishedAt&apiKey="+newsFeedApiKey)
        .then(res=>res.json()).then(post=>dispatch({
            type: FETCH_NEWS_FEED,
            payload: post
          })
          );
};