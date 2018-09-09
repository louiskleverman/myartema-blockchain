import React from 'react';
import '../../css/banner.css'

class banner extends React.Component{
    
    render(){
        let styleImage = {
            backgroundImage: "url(" + this.props.image + ') '
        }
        console.log(this.props.image);
        return(
        <div className="banner" style={styleImage}>
            <p>{ this.props.title}</p>
            <span className="account">{this.props.account}</span>
        </div>
        );
    }

}

export default banner