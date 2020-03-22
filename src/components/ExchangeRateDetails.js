import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/ExchangeRate.css';
import currencyList from '../assets/currencyList.json';
import { fetchCurrencyHistoryRate } from '../actions/currencyActions';

class ExchangeRateDetails extends Component{

    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        this.props.fetchCurrencyHistoryRate("NZD","USD");
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
        this.props.fetchCurrencyHistoryRate(event.target.value);
    }

    render(){
        console.log(this.props.posts);
        console.log(this.props.m)
        let currencyExch=[];
        let currencyOptions=[];
        if(this.props.posts!=null)
        {
            for(let key of Object.keys(this.props.posts.history))
            {
                currencyExch.push({"date":key, "value":this.props.posts[key]});
                
            }
            
        }
        let currHTML = currencyExch.map(sc=>{
            return <p><span>{sc.code}</span>  <span>{"$"+parseFloat(sc.value).toFixed(2)}</span></p>
        });
        
        return (
            
            <div  className="grid-item" width="20%">
                <h3>Exchange Details</h3>
                
                <div className="currencySideBarList">
                {currHTML}
                </div>
            </div>
        );
    }
}

ExchangeRateDetails.propTypes={
    fetchPosts:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    baseCurr:PropTypes.string.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.currHistory,
    baseCurr:state.posts.baseCurrency
});
export default connect(mapStateToProps,{fetchCurrencyHistoryRate})(ExchangeRateDetails);