import React,{Component} from 'react';
import ExchangeRate from './ExchangeRate';
import MutualFundList from './MutualFundList';
import StockList from './StockList';

import '../Styles/Body.css';


class Body extends Component{

    componentWillMount(){
        
    }
 
    render(){
        
        return (
            
            <div className="Body grid-container">
                <StockList/>
                <MutualFundList/>
                <ExchangeRate/>
            </div>
        );
    }
}


export default Body;