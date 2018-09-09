import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/navBar.css'

class navBar extends React.Component{
    
    render(){
        return(
        <div className="navBar">
            <NavLink to="/"><span className="brand">My Artema</span></NavLink>
            
            <NavLink to="/myAccount">My Account</NavLink>
            <NavLink to="/exploreArt">Explore Art</NavLink>

            
            <NavLink to="/addArt"><button className="addArt">Add art</button></NavLink>
            
        </div>
        );
    }

}

export default navBar