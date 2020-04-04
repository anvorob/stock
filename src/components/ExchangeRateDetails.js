import React,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/ExchangeRate.css';
import currencyList from '../assets/currencyList.json';
import { fetchCurrencyHistoryRate } from '../actions/currencyActions';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


class ExchangeRateDetails extends Component{
toCurrency="";
baseCurrency;
    constructor(){
        super();
        this.changeBaseCurrency = this.changeBaseCurrency.bind(this); 
    }

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
    
        // ... chart code goes here ...
        chart.paddingRight = 20;

        let data = [];
        
        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
        
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;



        this.chart = chart;
    }
    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    componentWillMount(){
        if("currCode" in this.props.match.params)
        {
            console.log(this.props.match.params.currCode);
            this.toCurrency = this.props.match.params.currCode;
            //this.props.fetchCurrencyHistoryRate("NZD",this.props.match.params.currCode);
        }
    }
    componentDidUpdate(oldProps) {
        
        if (oldProps.posts !== this.props.posts) {
            let data = [];
          for(let key of Object.keys(this.props.posts.history))
            {
                data.push({ date: new Date(key), name: "name"+this.props.posts.history[key], value: this.props.posts.history[key]});
            }
            this.chart.data = data;
        }
      }
    changeBaseCurrency(event){
        console.log(event.target.value);
        //this.props.fetchCurrencyHistoryRate(event.target.value);
    }

    render(){
        console.log(this.props.posts);
        
        
        return (
            
            <div  className="grid-item" width="20%">
                <h3>Exchange Details NZD to {this.toCurrency}</h3>
                <div className="currencySideBarList">
                    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
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