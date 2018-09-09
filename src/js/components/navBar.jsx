import React from 'react';
import { NavLink } from 'react-router-dom'

class navBar extends React.Component{
    
    render(){
        return(
        <nav className="navbar navbar-dark bg-dark">
            <NavLink to="/"><span className="navbar-brand">My Artema</span></NavLink>
            
            <NavLink to="/myAccount"><span>My Account</span></NavLink>
            <NavLink to="/exploreArt"><span>Explore Art</span></NavLink>

            <div className="form-inline">
                <NavLink to="/addArt"><button className="btn btn-outline-info my-2 my-sm-0">Add art</button></NavLink>
            </div>
        </nav>
        );
    }

}

export default navBar