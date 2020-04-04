import React,{Component} from 'react';



class NewsItem extends Component{

    componentWillMount(){
        
    }
 
    render(){
        
        return (
            
            <div className="grid-container-news-feed" >
                <div className="grid-news-item"><img src={this.props.urlToImage}/></div>
                <div className="grid-news-item">
                    <h3>
                        <a href={this.props.url}>{this.props.title}</a>
                    </h3>
                    <p>{this.props.description}</p>
                    <div className="credits"><i className="material-icons">access_time</i>{this.props.publishedAt} <i className="material-icons">person</i>{this.props.author}</div>
                </div>
            </div>

        );
    }
}


export default NewsItem;