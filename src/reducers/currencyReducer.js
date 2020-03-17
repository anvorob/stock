import {FETCH_CURRENCIES} from '../actions/types';

const initialState = {
    currency: [],
    baseCurrency: {}
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_CURRENCIES:
        //console.log(action.payload);
        return {
          ...state,
          items: action.payload
        };
      
      default:
        return state;
    }
  }