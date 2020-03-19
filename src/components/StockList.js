import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getStockList } from '../actions/currencyActions';
import StockItem from './StockItem';
import PropTypes from 'prop-types';
import tickersList1 from '../assets/globalTickers.json';

class StockList extends Component{
tickersList=[];
    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        this.props.getStockList(["SKO.NZ"]);
        this.tickersList = tickersList1;
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
        
    }

   
    render(){
        console.log(this.props);
        console.log(this.tickersList);
        let listOfMutualFunds="";
        if(this.props.posts!=null && this.props.posts.data!== undefined && this.props.posts.data.length>0){
            listOfMutualFunds = this.props.posts.data.map(stockI=><StockItem {...stockI} />)
        }
        return (
            
            <div className="grid-item">
               {listOfMutualFunds} 
            </div>
        );
    }
}
StockList.propTypes={
    getStockList:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.stockList
});

export default connect(mapStateToProps,{getStockList})(StockList);