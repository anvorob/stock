import {FETCH_CURRENCIES,FETCH_MUTUAL_FUNDS} from '../actions/types';

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
        case FETCH_MUTUAL_FUNDS:
          //console.log(action);
          return {
            ...state,
            mutualFunds: action.payload
          };
      default:
        return state;
    }
  }