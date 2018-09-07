import React from 'react';

class navBar extends React.Component{
    
    render(){
        return(
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">My Artema</a>
            <div className="form-inline">
                <button className="btn btn-outline-info my-2 my-sm-0">Add art</button>
            </div>
        </nav>
        );
    }

}

export default navBar