import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getMutualFund } from '../actions/currencyActions';
import MutualFundItem from './MutualFundItem';
import PropTypes from 'prop-types';

class MutualFundList extends Component{

    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        this.props.getMutualFund(["AAAAX","AAADX","AAAGX"]);
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
    }

   
    render(){
        //console.log(this.props);
        let listOfMutualFunds="";
        if(this.props.posts!=null && this.props.posts.data!== undefined && this.props.posts.data.length>0){
            listOfMutualFunds = this.props.posts.data.map(stockI=><MutualFundItem {...stockI} />)
        }
        return (
            
            <div className="grid-item">
                    {listOfMutualFunds}
                </div>
        );
    }
}

MutualFundList.propTypes={
    getMutualFund:PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    posts: state.posts.mutualFunds
});
export default connect(mapStateToProps,{getMutualFund})(MutualFundList);