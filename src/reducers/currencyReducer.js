import {FETCH_CURRENCIES,
      FETCH_MUTUAL_FUNDS,
      FETCH_STOCK_LIST,
      FETCH_STOCK_HISTORY,
      FETCH_STOCK_INTRADAY,
      FETCH_CURRENCY_HIST_DATA,
      FETCH_SECTOR_DATA,
      FETCH_NEWS_FEED} from '../actions/types';

const initialState = {
    currency: [],
    baseCurrency: "",
    mutualFunds:[]
  };

  export default function(state = initialState, action) {

    switch (action.type) {
      case FETCH_CURRENCIES:
        //console.log(action);
        return {
          ...state,
          baseCurrency:  action.baseCurrency,
          items: action.payload
        };
        case FETCH_CURRENCY_HIST_DATA:
          return {
            ...state,
          baseCurrency:  action.baseCurrency,
          toCurrency:  action.toCurrency,
          currHistory: action.payload
          }
        case FETCH_MUTUAL_FUNDS:
          //console.log(action);
          return {
            ...state,
            mutualFunds: action.payload
          };

          case FETCH_STOCK_LIST:
          //console.log(action);
          return {
            ...state,
            stockList: action.payload
          };

          case FETCH_STOCK_HISTORY:
          //console.log(action);
          return {
            ...state,
            stockHistory: action.payload
          };

          case FETCH_STOCK_INTRADAY:
          //console.log(action);
          return {
            ...state,
            stockIntraday: action.payload
          };

          case FETCH_SECTOR_DATA:
          //console.log(action);
          return {
            ...state,
            sectorData: action.payload
          };

          case FETCH_NEWS_FEED:
          //console.log(action);
          return {
            ...state,
            newsFeed: action.payload
          };
      default:
        return state;
    }
  }