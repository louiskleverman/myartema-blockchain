import React from 'react'
import Banner from '../components/banner.jsx'
import Arts from "../components/Arts.jsx"
import '../../css/account.css'
import ArtistInfo from '../components/ArtistInfo.jsx'

class MyAccount extends React.Component{
    state = {
        accountBoughtArts : []
    }
    render(){
        return(
        <React.Fragment>
            <Banner title="My Account" account={this.props.state.account}/>
            <main className="container account">
                <ArtistInfo id={this.props.state.account} state={this.props.state}/>
                <Arts state={this.props.state}  arts={this.props.state.myArts} title="My art"/>
                <Arts state={this.props.state}  arts={this.state.accountBoughtArts} title="Art I bought"/>
            </main>
            
        </React.Fragment>
        );
    }

    componentDidMount(){
        this.loadAccountBoughtArts();

    }

    loadAccountBoughtArts = () =>{
        this.props.state.myArtemaInstance.getBoughtArts.call(this.props.state.account).then((tab)=>{
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

export default MyAccount