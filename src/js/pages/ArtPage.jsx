import React from 'react'
import Banner from '../components/banner.jsx'

class ArtPage extends React.Component{
    state = {
      art : {
        id : null,
        name: null,
        image: null,
        price: null,
        description: null,
        owner: null,
        buyer : null
      }
    }
    render(){
        let imageStyle = {
            backgroundImage : "url(../" + this.state.art.image + ")",
            height:"200px",
            width:"200px"
        }
        return(
        <React.Fragment>
            <Banner title="Art" account={this.props.state.account}/>
            <main className="container artPage">
                <h2>{this.props.match.params.id}</h2>
                <div className="artImage">
                    <div className="image" style={imageStyle}></div>
                </div>
                <div className="artInfo">
                    <div className="artName">{this.state.art.name}</div>
                    <div className="artPrice">{this.state.art.price}</div>
                    <div className="artDescription">{this.state.art.description}</div>
                </div>

            </main>
            
        </React.Fragment>
        );
    }

    componentDidMount(){
        this.loadArt();
    }
    
    loadArt = () =>{
        this.props.state.myArtemaInstance.getArt.call(this.props.match.params.id).then((artResult)=>{
            let art= this.props.newArt(artResult);
            this.setState({art});
        });
    }

}

export default ArtPage