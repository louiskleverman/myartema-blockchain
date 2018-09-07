import React from 'react'
import '../../css/art.css'
import Web3 from 'web3'
//import fontAwesome from "font-awesome";

class Art extends React.Component{
    state = {
        liked : false,
        reposted : false
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
        
    }

    render(){
        var imgUrl = this.props.art.image;
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
        let repostIcon = this.state.reposted ? <i className="fas fa-retweet"></i> : <i className="fas fa-retweet"></i>;

        console.log("RENDERED");

      

        return(
        <div className="col-md-4">
            <div className="art">
                <div className="artImage" style={imageStyle}>
                    <div className="overlay"></div>
                    <div className="buttons">
                        <a className={ this.state.liked ? "like on" : "like"} onClick={this.like}> {likeIcon} {this.state.liked} </a>
                        
                        <a className={ this.state.reposted ? "repost on" : "repost"} onClick={this.repost}><i className="fas fa-retweet"></i></a>
                    </div>
                </div>
                <div className="artInfo">
                    <h4>{this.props.art.name}</h4>
                    <span className="artPrice">{
                        price == 0 ?
                        "Not for sale":
                        this.props.art.buyer == '0x0000000000000000000000000000000000000000' ?
                        this.props.state.web3.fromWei(price, 'ether') + " ether" :
                        "Already bought"
                    }</span>
                    
                    {
                        this.props.art.owner == this.props.state.account ? 
                        ""
                        : this.props.art.buyer != '0x0000000000000000000000000000000000000000' ?
                        <button className="btn btn-primary" disabled>Buy</button> :
                        <button className="btn btn-primary" onClick={this.buyArt}>Buy</button> 
                    }
                </div>
            </div>
        </div>
        );
    }   

}

export default Art