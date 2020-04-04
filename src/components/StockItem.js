import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getNewsFeed } from '../actions/currencyActions';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';


class StockItem extends Component{
newsFeedHTML;
    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        if("symbol" in this.props)
        this.props.getNewsFeed(['"'+this.props.symbol+'"','"'+this.props.name+'"']);
        
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
        
    }

   
    render(){
        if(this.props.newsFeed!=undefined)
            this.newsFeedHTML =this.props.newsFeed.articles.map(news=><NewsItem {...news} />);
        return (
            
            <div>
                <table className="stockDetails">
                    
                    <tr><td>Close yesterday:</td><td>{this.props.close_yesterday}</td><td>Market cap:</td><td>{this.props.market_cap}</td></tr>
                    <tr><td>Open price:</td><td>{this.props.price_open}</td><td>GMT offset:</td><td>{this.props.gmt_offset}</td></tr>
                    <tr><td>Day's range:</td><td>{this.props.day_low} - {this.props.day_high}</td><td>Eps:</td><td>{this.props.eps}</td></tr>
                    <tr><td>52 week's range:</td><td>{this.props["52_week_low"]} - {this.props["52_week_high"]}</td><td>Pe:</td><td>{this.props.pe}</td></tr>
                    <tr><td>Volume avg:</td><td>{this.props.volume_avg}</td><td>Shares:</td><td>{this.props.shares}</td></tr>
                    <tr><td>Volume:</td><td>{this.props.volume}</td><td></td><td></td></tr>
                    
                </table>
                <h2>Related publicity</h2>
                <div>
                    {this.newsFeedHTML}
                </div>
            </div>
        );
    }
}

StockItem.propTypes={
    getNewsFeed:PropTypes.func.isRequired,
    newsFeed: PropTypes.array.isRequired
}
const mapStateToProps = state=>({
    newsFeed: state.posts.newsFeed
});
export default connect(mapStateToProps,{getNewsFeed})(StockItem);