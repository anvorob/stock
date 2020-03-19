import React,{Component} from 'react';


class StockItem extends Component{

    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
        
    }

   
    render(){
        //console.log(this.props);
        
        return (
            
            <div >
                <h3>{this.props.name} ({this.props.symbol})</h3>
                <p>Share price: ${this.props.price}</p>
                <p>Divident date: {this.props.income_dividend_date}</p>
                <p>currency: {this.props.currency}</p>
                <p>price_open: {this.props.price_open}</p>
                <p>day_high: {this.props.day_high}</p>
                <p>day_low: {this.props.day_low}</p>
                <p>52_week_high: {this.props["52_week_high"]}</p>
                <p>change_pct: {this.props.change_pct}</p>
                <p>market_cap: {this.props.market_cap}</p>
                <p>volume: {this.props.volume}</p>
                <p>shares: {this.props.shares}</p>
                <p>stock_exchange_long: {this.props.stock_exchange_long}</p>
                <p>stock_exchange_short: {this.props.stock_exchange_short}</p>
                <p>last_trade_time: {this.props.last_trade_time}</p>
                <p>day_low: {this.props.day_low}</p>

            </div>
        );
    }
}


export default StockItem;