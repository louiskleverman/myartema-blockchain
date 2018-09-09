import React from 'react'
import '../../css/linkCard.css'
import { NavLink } from 'react-router-dom'

class LinkCard extends React.Component{
    
    render(){
        let style = {
            backgroundImage : "url(" + this.props.image + ")"
        }
        return(
        <NavLink className="col-md-6" to={this.props.link}>
            <div className={"linkCard " + (this.props.link == "" ? "active" : '')} style={style}>
                <p>{this.props.text}</p>
            </div>
        </NavLink>
        );
    }

}

export default LinkCard