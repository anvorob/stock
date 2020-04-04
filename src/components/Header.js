import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import tickersList1 from '../assets/globalTickers.json';
import '../Styles/Menu.css';
class Header extends Component 
{
    constructor(){
        super();
        this.state = {
                fieldSearch:"",
                tickersByCountry:[],
                tickersByField:[]
        };
        this.changeLiveTickerSearch = this.changeLiveTickerSearch.bind(this); 
    }
    componentWillMount(){
        this.filterTickers("country");
        this.filterTickers("field");
    }
    filterTickers(filterBy, searchWord=""){
        let tickersFiltered = tickersList1.reduce((distinctArr,item)=>{
            
            if(!distinctArr.includes(item[filterBy]) && item[filterBy].toLowerCase().includes(searchWord.toLowerCase()))
                distinctArr.push(item[filterBy]);
            return distinctArr;
        }, []); 

        //if(filterBy=="field")
        tickersFiltered.unshift(<div className="searchRow"><input type="text" className="searchRowInput" placeholder="Search" onChange={(e)=>this.changeLiveTickerSearch(e,filterBy)}/> </div>);
    //     background: #aeb5be;
    // padding: 0px;
        if(filterBy=="country")
        this.setState({tickersByCountry:tickersFiltered.map(ticker=><Link to={{pathname: `/stocks/${filterBy}/${ticker}`, query: '/rateDetails'}} >{ticker}</Link>)});
        if(filterBy=="field")
        this.setState({tickersByField:tickersFiltered.map(ticker=><Link to={{pathname: `/stocks/${filterBy}/${ticker}`, query: '/rateDetails'}} >{ticker}</Link>)});

        // this.setState((state) => {
        //     return {tickersByField:state.tickersByField.unshift(<div className="searchRow"><input type="text" className="searchRowInput" placeholder="Search" onChange={(e)=>this.changeLiveTickerSearch(e,filterBy)}/> </div>)};
        //   });
        
    }
    changeLiveTickerSearch(event, field){
        
        this.setState({fieldSearch:event.target.value});
        this.filterTickers(field,event.target.value);
    }
    render(){
        
        return (
            <div className="Header">
                <Link to='/' className="dropbtn">Home</Link>
                <div className="dropdown">
                    <button className="dropbtn">Tickers</button>
                    <div className="dropdown-content">

                        <div className="dropdown">
                        <button className="dropbtn">By Country</button>
                            <div className="dropdown-content dropdown-content-left">
                                {this.state.tickersByCountry}
                            </div>
                        </div>
                        <div className="dropdown">
                        <button className="dropbtn">By Field</button>
                            <div className="dropdown-content dropdown-content-left">
                            {this.state.tickersByField}
                            </div>
                        </div>
                        <Link to='/'>Search</Link>
                    </div>
                </div>
                <Link to='/' className="dropbtn">Currency Exchange</Link>
                <Link to='/mutualFunds' className="dropbtn">Mutual Funds</Link>

            </div>
        );
    }
}

export default Header;