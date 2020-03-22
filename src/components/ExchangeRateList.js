import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/ExchangeRate.css';
import currencyList from '../assets/currencyList.json';
import { fetchCurrencyRate } from '../actions/currencyActions';

class ExchangeRateList extends Component{

    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        this.props.fetchCurrencyRate("NZD");
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
        this.props.fetchCurrencyRate(event.target.value);
    }

    render(){
        console.log(this.props.posts);
        
        let currencyExch=[];
        let currencyOptions=[];
        if(this.props.posts!=null)
        {
            for(let key of currencyList.filter(curr=>curr.popularity==0).map(curr=>curr.code))
            {
                if(key!==this.props.baseCurr)
                    currencyExch.push({"code":key, "value":this.props.posts["data"][key]});
                else 
                    currencyExch.push({"code":key, "value":"1"});
            }
            
        }
        let currHTML = currencyExch.map(sc=>{
            return <p><span>{sc.code}</span>  <span>{"$"+parseFloat(sc.value).toFixed(2)}</span></p>
        });
        //console.log(this.props.baseCurr);
        currencyOptions = currencyExch.map(sc=>{return <option>{sc.code}</option>});
        currencyOptions.unshift(<option>{this.props.baseCurr}</option>)
        return (
            
            <div  className="grid-item" width="20%">
                <h3>Exchange Rate</h3>
                <select value={this.props.baseCurr} onChange={this.changeBaseCurrency}>{currencyOptions}</select>
                <div className="currencySideBarList">
                {currHTML}
                </div>
            </div>
        );
    }
}

ExchangeRate.propTypes={
    fetchPosts:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    baseCurr:PropTypes.string.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.items,
    baseCurr:state.posts.baseCurrency
});
export default connect(mapStateToProps,{fetchCurrencyRate})(ExchangeRateList);