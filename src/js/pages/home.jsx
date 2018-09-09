import React from 'react'
import '../../css/home.css'
import Banner from '../components/banner.jsx'
import BecomeArtist from '../components/BecomeArtist.jsx'
import PageLinks from '../components/PageLinks.jsx';
import { NavLink } from 'react-router-dom';

class Home extends React.Component{
    
    render(){
        return(
        <React.Fragment>
            <Banner title="Home" account={this.props.state.account} image="../images/home.png"/>
            <main className="container home">
                <h1>Welcome to MyArtema {this.props.state.name}</h1>
                {
                    this.props.state.name == '' ?
                    <BecomeArtist state = {this.props.state} />
                    : ""
                }
                <PageLinks/>
            </main>   
        </React.Fragment>
        );
    }

}

export default Home