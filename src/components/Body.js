import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { fetchCurrencyRate } from '../actions/currencyActions';

class Body extends Component{

    componentWillMount(){
        this.props.fetchCurrencyRate();
    }

apiToken= 'BwzDKO8Cn6yrzi4PrZLUYn94Ily8LQpdsIWUA9stW2UHBJBxA1IAyGek4Lil';
baseURI = 'https://api.worldtradingdata.com/api/v1/';
proxyUrl = 'https://cors-anywhere.herokuapp.com/';
baseCurrency = "USD";
   
    render(){
        console.log(this.props.posts);
        let currencyExch=[];
        if(this.props.posts!=null)
        {
            for(let key of Object.keys(this.props.posts["data"]))
            currencyExch.push({"code":key, "value":this.props.posts["data"][key]});
        }
        let currHTML = currencyExch.map(sc=>{
            return <p><span>{sc.code}</span>  <span>{"$"+parseFloat(sc.value).toFixed(2)}</span></p>
        })
        return (
            <div className="Body">
                <h3>Body</h3>
                {currHTML}
            </div>
        );
    }
}

Body.propTypes={
    fetchPosts:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.items
});
export default connect(mapStateToProps,{fetchCurrencyRate})(Body);