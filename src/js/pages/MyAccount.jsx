import React from 'react'
import Banner from '../components/banner.jsx'
import Arts from "../components/Arts.jsx"
import '../../css/account.css'

class MyAccount extends React.Component{
    
    render(){
        return(
        <React.Fragment>
            <Banner title="My Account" account={this.props.state.account}/>
            <main className="container account">
                <Arts state={this.props.state}  arts={this.props.state.myArts} title="My art"/>
            </main>
            
        </React.Fragment>
        );
    }

    

}

export default MyAccount