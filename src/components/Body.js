import React,{Component} from 'react';
import ExchangeRate from './ExchangeRate';
import StockItem from './StockItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Body.css';
import { getMutualFund } from '../actions/currencyActions';

class Body extends Component{

    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        this.props.getMutualFund(["AAAAX","AAADX","AAAGX"]);
    }

    changeBaseCurrency(event){
        //this.props.getMutualFund(event.target.value);
    }
apiToken= 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';
baseURI = 'https://api.worldtradingdata.com/api/v1/';
proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//baseCurrency = "USD";
   
    render(){
        //console.log(this.props.posts);
        let listOfStocks="";
        if(this.props.posts!=null && this.props.posts.length>0){
            console.log(this.props.posts.data);
        }
        //listOfStocks = this.props.posts.data.map(stockI=><StockItem {...stockI} />)
        return (
            
            <div className="Body grid-container">
                <div className="grid-item">
                    {listOfStocks}
                </div>
                <ExchangeRate/>
                
            </div>
        );
    }
}

Body.propTypes={
    getMutualFund:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.mutualFunds
});
export default connect(mapStateToProps,{getMutualFund})(Body);