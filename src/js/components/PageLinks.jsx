import React from 'react'
import '../../css/pageLinks.css'
import LinkCard from './LinkCard.jsx'

class PageLinks extends React.Component{
    
    render(){
        return(
        <div className="pageLinks row">
            <div className="col-md-12 title"><h3>what you can find</h3></div>
            <LinkCard link="" text="Home" image="../images/home.png"/>
            <LinkCard link="/myAccount" text="My Account"/>
            <LinkCard link="/exploreArt" text="Explore Art" image="../images/explore.png"/>
            <LinkCard link="/addArt" text="Add Art" image="../images/addArt.png"/>
        </div>
        );
    }

}

export default PageLinks