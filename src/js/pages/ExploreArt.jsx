import React from 'react'
import '../../css/explore.css'
import Banner from '../components/banner.jsx'
import Arts from "../components/Arts.jsx"

class ExploreArt extends React.Component{
    
    render(){
        return(
        <React.Fragment>
            <Banner title="Explore Art" account={this.props.state.account}  image="../images/explore.png"/>
            <main className="explore container">
                <Arts state={this.props.state} arts={this.props.state.recentArts} title="Recent arts"/>
            </main>
            
        </React.Fragment>
        );
    }

    

}

export default ExploreArt