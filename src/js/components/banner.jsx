import React from 'react';
import '../../css/banner.css'

class banner extends React.Component{
    
    render(){
        return(
        <div className="banner">
            <p>{ this.props.title}</p>
            <span className="account">{this.props.account}</span>
        </div>
        );
    }

}

export default banner