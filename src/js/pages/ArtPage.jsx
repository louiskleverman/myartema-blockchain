import React from 'react'
import '../../css/artPage.css'
import ipfs from '../ipfs'
import { NavLink } from 'react-router-dom'

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
      },
      ownerName : null
    }
    render(){
        let priceText =  this.state.art.price == 0 ?
        "Not for sale" : 
        this.state.art.buyer == '0x0000000000000000000000000000000000000000' || this.state.art.buyer == this.state.art.owner?
        <span>{this.props.state.web3.fromWei(this.state.art.price, 'ether') } <i className="fab fa-ethereum"></i></span>:
        "Already bought";

        let description = this.state.art.description != "" ?
        this.state.art.description
        :
        <span className=""><em>No description for this image</em></span>

        let owner = this.state.ownerName != "" ? this.state.ownerName : this.state.art.owner;
        return(
        <React.Fragment>
            <main className="artPage">
                <div className="artImage">
                    <h3>{this.state.art.name}</h3>
                    <img src={this.state.art.image}/>
                </div>
                <div className="artInfo container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="artArtist">
                                <h5 className="artHeader">Artist</h5>
                                <NavLink to={"/artist/"+this.state.art.owner}>{owner} </NavLink>
                            </div>
                            <div className="artPrice">
                                <h5 className="artHeader">Price</h5>
                                {priceText}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="artDescription">
                                <h5 className="artHeader">Description</h5>
                                <p className="description">{description}</p>
                            </div>
                        </div>
                    </div>
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
            console.log(art.image);
            ipfs.files.get(art.image,(error,files) =>{
                if(error){
                    console.log(error)
                }
                else{
                    art.image = files[0].content;
                    this.setState({art});
                    this.getOwnerName();
                }
            })
        
        });


    }

    getOwnerName = () =>{
        this.props.state.myArtemaInstance.getArtistName.call(this.state.art.owner).then((ownerName) =>{
            this.setState({ownerName})
        });
    }

}

export default ArtPage