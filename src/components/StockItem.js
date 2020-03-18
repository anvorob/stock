import React,{Component} from 'react';


class StockItem extends Component{

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
        console.log(this.props);
        
        return (
            
            <div >
                <h3>Exchange Rate</h3>
                
            </div>
        );
    }
}


export default StockItem;