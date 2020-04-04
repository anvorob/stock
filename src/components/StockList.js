import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getStockList } from '../actions/currencyActions';
import { Link } from 'react-router-dom';
import StockItem from './StockItem';
import PropTypes from 'prop-types';
import tickersList1 from '../assets/globalTickers.json';

class StockList extends Component{
tickersList=[];
paginationHTML;
    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
        this.changeBasegeneratePagesCurrency = this.generatePages.bind(this); 
        this.pageUpdate = this.pageUpdate.bind(this); 
        this.state = {currentPage:0}
    }
    componentWillMount(){
        if( "href" in this.props)
        {
            window.location.href=this.props.href;
        }
        else if("type" in this.props.match.params && "symbol" in this.props.match.params)
        {
            //console.log(tickersList1.length);
            let filterBy = this.props.match.params.type;
            let filterValue = this.props.match.params.symbol;
            this.setState({filterBy : filterBy});
            this.setState({filterValue: filterValue});
            let page = parseInt(this.props.match.params.page)||0;
            let limit = parseInt(this.props.match.params.limit)||20;
            this.paginationHTML = this.generatePages(page,Math.ceil(tickersList1.length/limit),limit,filterBy,filterValue);
            let filteredTickerList = tickersList1.filter(ticker=>ticker[filterBy].includes(filterValue)).slice(page*limit,(page*limit)+limit);
            this.setState({tickersList:filteredTickerList})
            this.setState({currentPage:page})
            // Cannot get more than 5 recods due to API limitation
            //this.props.getStockList(filteredTickerList.map(ticker=>ticker.code));
            
        }
        //this.props.getStockList(["SKO.NZ"]);
        //this.setState({tickersList:tickersList1})
    }

    generatePages(currentPage, pages,limit, filterBy, ticker){
        let pagesHTML=[];
            if(currentPage!==0)
            pagesHTML.push(<Link to={{pathname: `/stocks/${filterBy}/${ticker}/${currentPage-1}/${limit}`, query: '/rateDetails'}}  >Previous</Link>)
            //pagesHTML.push(<a onClick={(e)=>this.pageUpdate(currentPage-1)} >Previous</a>)
        
            pagesHTML.push(<div>{currentPage}/{pages}</div>)
            if(currentPage!==pages)
            pagesHTML.push(<Link to={{pathname: `/stocks/${filterBy}/${ticker}/${currentPage+1}/${limit}`, query: '/rateDetails'}}  >Next</Link>)
            //pagesHTML.push(<button onClick={(e)=>this.pageUpdate(currentPage+1)} >Next</button>)
        return pagesHTML;
    }
    changeBaseCurrency(event){
        console.log(event.target.value);
        this.setState({tickersList:tickersList1.filter(ticker=>ticker[this.state.filterBy].includes(this.state.filterValue) && (ticker.code.toUpperCase().includes(event.target.value.toUpperCase()) || ticker.name.toUpperCase().includes(event.target.value.toUpperCase())))});
        //this.setState({tickersList:tickersList1})
    }
    pageUpdate(event){
        console.log(event)
        this.setState({currentPage:event});
        console.log(this.state)
    }

// Accepts the array and key
    groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
   
    render(){
        
        let listOfStockItems=[];
        // if(this.props.posts!=null && this.props.posts.data!== undefined && this.props.posts.data.length>0){
            //listOfStockItems = this.props.posts.data.map(stockI=><StockItem {...stockI} />)
        // }
        let grouppedByCountry = this.groupBy(this.state.tickersList, "country");
        
        for(let key of Object.keys(grouppedByCountry))
        {
            //console.log(grouppedByCountry[key]);
            listOfStockItems.push(<tr><td colSpan="3"><h2>{key}</h2></td></tr>);
            listOfStockItems.push(grouppedByCountry[key].map(stockI=><tr><td className="stockItem"><Link to={{pathname: `/stockDetails/${stockI.code}`, query: '/symbol'}}>{stockI.code}</Link></td><td className="stockItem">{stockI.name}</td><td className="stockItem">{stockI.exchange}</td></tr>));
        
        }
        
        // {"code":"BMH.AX","name":"Baumart Holdings Limited","exchange":"ASX","field":"General Building Materials","country":"Australia"
        //console.log(listOfStockItems);
        return (
            
            <div>
                <div>
                    <input onChange={this.changeBaseCurrency}/>
                </div>
                
                <table className="stockListTable">
                    
                    <tbody>
                        {listOfStockItems} 
                    </tbody>
               </table>
               <div className="pagination">
                    {this.paginationHTML}
               </div>
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