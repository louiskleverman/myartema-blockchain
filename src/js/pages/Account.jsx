import React from 'react'
import Banner from '../components/banner.jsx'
import Arts from "../components/Arts.jsx"
import '../../css/account.css'

class Account extends React.Component{
    state = {
        address : null,
        accountArts : [],
        artistName : ''
    }
    render(){
        console.log(this.props.match.params.id);
        this.state.address = this.props.match.params.id;
        return(
        <React.Fragment>
            <Banner title="Account" account={this.props.state.account}/>
            <main className="container account">
                <h4>{this.state.artistName != '' ? this.state.artistName : this.state.address}</h4>
                <Arts state={this.props.state}  arts={this.state.accountArts} title="Arts"/>
            </main>
            
        </React.Fragment>
        );
    }

    componentDidMount(){
        this.loadAccountArts();

        this.props.state.myArtemaInstance.getArtistName.call(this.state.address).then((artistNameResult) =>{
            let artistName = artistNameResult;
            if(artistNameResult == '')
                artistName = this.props.art.owner;
            this.setState({artistName})
        });
    }
    
    loadAccountArts = () =>{
        this.props.state.myArtemaInstance.getArts.call(this.state.address).then((tab)=>{
            let accountArts = [];
            let length = tab.length;  
            console.log("arts",length);  
            if(length == 0){
                if(JSON.stringify(accountArts) != JSON.stringify(this.state.accountArts))
                    this.setState({ accountArts });
            }
            else{
                console.log("uh oh");
            let last = length < 6 ? length : 6;
            for(var i = length -1 ; i >= length - 6 && i >= 0; i--){
                this.props.state.myArtemaInstance.getArt.call(tab[i]).then((art) => {
                    accountArts.push(this.props.newArt(art));
                    
                    last--;
                    if(last ==0){
                        if(JSON.stringify(accountArts) != JSON.stringify(this.state.accountArts)){
                        this.setState({ accountArts });
                        }
                    }
                });
            }
            }
        });
    }

}

export default Account