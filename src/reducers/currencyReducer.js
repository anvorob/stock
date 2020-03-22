import {FETCH_CURRENCIES,FETCH_MUTUAL_FUNDS,FETCH_STOCK_LIST,FETCH_CURRENCY_HIST_DATA} from '../actions/types';

const initialState = {
    currency: [],
    baseCurrency: "",
    mutualFunds:[]
  };

  export default function(state = initialState, action) {
    console.log(action);
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
      default:
        return state;
    }
  }