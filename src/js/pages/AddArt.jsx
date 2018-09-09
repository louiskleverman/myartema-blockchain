import React from 'react'
//import '../../css/home.css'
import Banner from '../components/banner.jsx'
import AddArtForm from "../components/AddArtForm.jsx"

class AddArt extends React.Component{
    
    render(){
        return(
        <React.Fragment>
            <Banner title="Add Art" account={this.props.state.account}/>
            <main className="container">
                <AddArtForm {...this.props}/>
            </main>
            
        </React.Fragment>
        );
    }

    

}

export default AddArt