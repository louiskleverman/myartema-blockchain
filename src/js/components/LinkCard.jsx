import React from 'react'
import '../../css/linkCard.css'
import { NavLink } from 'react-router-dom'

class LinkCard extends React.Component{
    
    render(){
        let style = {

        }
        return(
        <NavLink className="col-md-6" to={this.props.link}>
            <div className={"linkCard " + (this.props.link == "" ? "active" : '')}>
                <p>{this.props.text}</p>
            </div>
        </NavLink>
        );
    }

}

export default LinkCard