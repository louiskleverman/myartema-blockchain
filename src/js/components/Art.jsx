import React from 'react'
import '../../css/art.css'
//import fontAwesome from "font-awesome";
import { NavLink } from 'react-router-dom'
import ipfs from '../ipfs'

class Art extends React.Component{
    state = {
        liked : false,
        reposted : false,
        artistName : '',
        imageRender : null
    }
    
    buyArt = () => {
        console.log("buying " + this.props.art.id);
        this.props.state.myArtemaInstance.buyArt(this.props.art.id,{from:this.props.state.account,value:this.props.art.price}).then(()=>{

        });
    } 
    like = () => {
        this.props.state.myArtemaInstance.likeArt(this.props.art.id,{from:this.props.state.account}).then(()=>{
            console.log("liked!");
        });
    }
    repost = () => {
        this.props.state.myArtemaInstance.repostArt(this.props.art.id,{from:this.props.state.account}).then(()=>{
            console.log("Reposted!");
        });
    }

    componentDidMount(){
        this.props.state.myArtemaInstance.getArtistName.call(this.props.art.owner).then((artistNameResult) =>{
            let artistName = artistNameResult;
            if(artistNameResult == '')
                artistName = this.props.art.owner;
            this.setState({artistName})
        });
        ipfs.files.get(this.props.art.image, (error,files) =>{
            if(error){
                console.log(error)
            } 
            else
                this.setState({ imageRender: files[0].content })     
            })
        }

    render(){
        var imgUrl = this.state.imageRender;
        var price = this.props.art.price;
        var imageStyle = {
            backgroundImage: 'url(' + imgUrl + ')'
        }
        this.props.state.myArtemaInstance.isLiked.call(this.props.art.id,{from:this.props.state.account}).then((result)=>{
            if(result){
                if(!this.state.liked){
                    let liked = true;
                    this.setState({liked});
                }
            }
            else{
                if(this.state.liked){
                    let liked = false;
                    this.setState({liked});
                }
            }
        });
        this.props.state.myArtemaInstance.isReposted.call(this.props.art.id,{from:this.props.state.account}).then((result)=>{
            if(result){
                if(!this.state.reposted){
                    let reposted = true;
                    this.setState({reposted});
                }
            }
            else{
                if(this.state.reposted){
                    let reposted = false;
                    this.setState({reposted});
                }
            }
        });

        let likeIcon = this.state.liked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>;
        //let repostIcon = this.state.reposted ? <i className="fas fa-retweet"></i> : <i className="fas fa-retweet"></i>;
      
        let priceText =  price == 0 ?
        "Not for sale" : 
        this.props.art.buyer == '0x0000000000000000000000000000000000000000'?
        <span>{this.props.state.web3.fromWei(price, 'ether') } <i className="fab fa-ethereum"></i></span>:
        "Already bought";

        let buyButton = this.props.art.owner == this.props.state.account || price == 0? 
        ""
        : this.props.art.buyer != '0x0000000000000000000000000000000000000000' ?
        <button disabled>Buy</button> :
        <button onClick={this.buyArt}>Buy</button> 

        return(
        <div className="col-md-4">
            
            <div className="art">
                <div className="artImage" style={imageStyle}>
                    <div className="overlay"></div>
                    <div className="artist"><NavLink to={"/artist/"+this.props.art.owner}>{this.state.artistName}</NavLink></div>
                    <div className="buttons">
                        <a className={ this.state.liked ? "like on" : "like"} onClick={this.like}> {likeIcon} {this.state.liked} </a>
                        
                        <a className={ this.state.reposted ? "repost on" : "repost"} onClick={this.repost}><i className="fas fa-retweet"></i></a>
                    </div>
                    <div className="artPrice">{priceText}</div>
                    <div className="buttonDiv">{buyButton}</div>
                </div>
                <div className="artInfo">
                    <NavLink to={"/art/"+this.props.art.id}><h4>{this.props.art.name}</h4></NavLink>
                    
                    
                </div>
            </div>
            
        </div>
        );
    }   
}

export default Art