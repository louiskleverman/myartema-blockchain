import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/navBar.css'

class navBar extends React.Component{
    
    render(){
        return(
        <div className="navBar">
            <NavLink to="/"><span className="brand">My Artema</span></NavLink>
            
            <NavLink to="/myAccount" className="link">My Account</NavLink>
            <NavLink to="/exploreArt" className="link">Explore Art</NavLink>

            
            <NavLink to="/addArt"><button className="addArt">Add art</button></NavLink>

            <a className="welcome">Welcome {this.props.name}</a>
            
        </div>
        );
    }

}

export default navBar