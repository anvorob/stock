import React,{Component} from 'react';


class MutualFundItem extends Component{

    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }
    componentWillMount(){
        
    }

    changeBaseCurrency(event){
        console.log(event.target.value);
        
    }

   
    render(){
        //console.log(this.props);
        
        return (
            
            <div >
                <h3>{this.props.name} ({this.props.symbol})</h3>
                <p>Share price: ${this.props.price}</p>
                <p>Divident date: {this.props.income_dividend_date}</p>
            </div>
        );
    }
}


export default MutualFundItem;