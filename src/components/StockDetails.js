import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Stock.css';
import { getStockHistoricalData,getStockList } from '../actions/currencyActions';

import StockItem from './StockItem';
import Tabs from './Tabs';
import CandlestickSeries from './Charts/CandlestickSeries';

require('../Styles/Tabs.css');
class StockDetails extends Component{
    company={
        companyName:"",
        symbol:"",
        currency:"",
        currentSharePrice:"",
        lastTradeDay:"",
        stock_exchange_long:"",
        stock_exchange_short:"",

        timezone_name:"",
        timezone:"",
        day_change:"",
        change_pct:""
    }
    
listOfStockItems;
    constructor(){
        super();
    }
    componentDidMount() {
        console.log(this.props);
        if("symbol" in this.props.match.params)
        {
            this.props.getStockList([this.props.match.params.symbol]);
            console.log(this.listOfStockItems,this.props.match.params)
        }
    }
    
    
    

    render(){
        
            console.log(this.props);
        this.symbol = this.props.match.params.symbol;
        this.companyPriceColour = "";
        if(this.props.stockList!=null && this.props.stockList.data!== undefined && this.props.stockList.data.length>0)
        {
            this.company.companyName = this.props.stockList.data[0].name;
            this.company.symbol = this.props.stockList.data[0].symbol;
            this.company.lastTradeDay = this.props.stockList.data[0].last_trade_time;
            this.company.currentSharePrice = this.props.stockList.data[0].price;
            this.company.stock_exchange_long = this.props.stockList.data[0].stock_exchange_long;
            this.company.stock_exchange_short = this.props.stockList.data[0].stock_exchange_short;
            this.company.currency = this.props.stockList.data[0].currency;
            this.company.timezone_name = this.props.stockList.data[0].timezone_name;
            this.company.timezone = this.props.stockList.data[0].timezone;
            this.company.day_change = this.props.stockList.data[0].day_change;
            this.company.change_pct = this.props.stockList.data[0].change_pct;
            // If company stock is rising set it to green, otherwise red foreground by default
            if(!isNaN(this.company.change_pct))
                this.companyPriceColour =  (parseInt(this.company.change_pct)>0)?"greenText":"";
            
                this.listOfStockItems =this.props.stockList.data.map(stockItem=><StockItem {...stockItem} />);
        }
        return (
            (this.props.stockList==null)?
            <div></div>:
            <div className="stockItemWrapper">
                <div className="companyInfoHeader">
                    <span className="companyTitle">{this.company.companyName} ({this.company.symbol})</span>
                    <span className="companyExMarket">{this.company.stock_exchange_long} ({this.company.stock_exchange_short}). Currency in {this.company.currency}</span>
                    <span className="companyCurrentStats">{this.company.currentSharePrice}  <span className={"companyColourIndication "+this.companyPriceColour}>{this.company.day_change}  ({this.company.change_pct}%)</span></span>
                    <span className="companyLastTrade">Last updated on {this.company.lastTradeDay}</span>
    
                </div>
                <Tabs>
                    <div label="Summary">
                    {this.listOfStockItems}
                    </div>
                    <div label="Historical">
                        <h2>Historical data</h2>
                        <CandlestickSeries query={"history?symbol="+this.props.match.params.symbol} domain="api"/>
                    </div>
                    <div label="Intraday">
                    <h2>Intraday</h2>
                    <CandlestickSeries query={"intraday?symbol=SKO.NZ&interval=1&range=7"} domain="intraday"/>
                    </div>
                </Tabs>
                
            </div>
        );
    }
}

StockDetails.propTypes={
    fetchPosts:PropTypes.func.isRequired,
    getStockList:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    stockList: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.stockHistory,
    stockList: state.posts.stockList
});
export default connect(mapStateToProps,{getStockHistoricalData,getStockList})(StockDetails);