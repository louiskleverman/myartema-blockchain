import React from 'react'
import Banner from '../components/banner.jsx'
import Arts from "../components/Arts.jsx"
import '../../css/account.css'
import ArtistInfo from '../components/ArtistInfo.jsx'

class Account extends React.Component{
    state = {
        address : null,
        accountArts : [],
        artistName : '',
        accountBoughtArts : []
    }
    render(){
        this.state.address = this.props.match.params.id;
        return(
        <React.Fragment>
            <Banner title="Account" account={this.props.state.account}/>
            <main className="container account">
                <ArtistInfo id={this.props.match.params.id} state={this.props.state}/>
                <Arts state={this.props.state}  arts={this.state.accountArts} title="Arts"/>
                <Arts state={this.props.state}  arts={this.state.accountBoughtArts} title="Bought arts"/>
            </main>
            
        </React.Fragment>
        );
    }

    componentDidMount(){
        this.loadAccountArts();
        this.loadAccountBoughtArts();

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
            if(length == 0){
                if(JSON.stringify(accountArts) != JSON.stringify(this.state.accountArts))
                    this.setState({ accountArts });
            }
            else{
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

    loadAccountBoughtArts = () =>{
        this.props.state.myArtemaInstance.getBoughtArts.call(this.state.address).then((tab)=>{
            let accountBoughtArts = [];
            let length = tab.length;   
            if(length == 0){
                if(JSON.stringify(accountBoughtArts) != JSON.stringify(this.state.accountBoughtArts))
                    this.setState({ accountBoughtArts });
            }
            else{
                let last = length < 6 ? length : 6;
                for(var i = length -1 ; i >= length - 6 && i >= 0; i--){
                    this.props.state.myArtemaInstance.getArt.call(tab[i]).then((art) => {
                        accountBoughtArts.push(this.props.newArt(art));
                        
                        last--;
                        if(last ==0){
                            if(JSON.stringify(accountBoughtArts) != JSON.stringify(this.state.accountBoughtArts)){
                            this.setState({ accountBoughtArts });
                            }
                        }
                    });
                }
            }
        });
    }
}

export default Account