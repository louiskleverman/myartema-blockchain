import React from 'react'
import '../../css/artistInfo.css'
import { NavLink } from 'react-router-dom'

class ArtistInfo extends React.Component{
    state = {
        artist : null,
        numberOfArts : null,
        numberOfArtsBought : null
    }

    componentDidMount(){
        this.getArtistInfo();
    }

    render(){
        return(
        <div className="artistInfo row">
            <div className="col-md-6">
                <div className="artist">
                    <h5 className="artistInfoHeader">Artist</h5>
                    <p>{this.state.artist}</p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="numberOfArts">
                    <h5 className="artistInfoHeader">Number of arts</h5>
                    {this.state.numberOfArts}
                </div>
                <div className="numberOfArtsBought">
                    <h5 className="artistInfoHeader">Number of arts bought</h5>
                    {this.state.numberOfArtsBought}
                </div>
            </div>
        </div>
        );
    }

   
    getArtistInfo = () =>{
        this.props.state.myArtemaInstance.getArtistInfo.call(this.props.id).then((result)=>{
            let artist = result[0] != "" ? result[0] : this.props.id
            this.setState({
                artist,
                numberOfArts : parseInt(result[1]),
                numberOfArtsBought : parseInt(result[2])
            });
        })
    }

}

export default ArtistInfo