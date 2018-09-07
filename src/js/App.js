import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import MyArtema from '../../build/contracts/MyArtema.json'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from "./components/navBar.jsx"
import Banner from "./components/banner.jsx"
import AddArtForm from "./components/AddArtForm.jsx"
import Arts from "./components/Arts.jsx"

class App extends React.Component {
  state = {
    account: '0x0',
    myArtemaInstance: null,
    accountInterval: null,
    web3: null,
    myArts: [
     
    ],
    recentArts: []
  }

  constructor(props) {
    super(props)

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.state.web3 = new Web3(this.web3Provider)

    this.myArtema = TruffleContract(MyArtema)
    this.myArtema.setProvider(this.web3Provider)

    this.addArt = this.addArt.bind(this)
    this.getMyArt = this.getMyArt.bind(this)
    this.getRecentArt = this.getRecentArt.bind(this)
    this.state.account = this.state.web3.eth.accounts[0]

    

  }

  componentDidMount() {
    this.myArtema.deployed().then((myArtemaInstance) => {
      this.state.myArtemaInstance = myArtemaInstance;
      this.getMyArt();
      this.getRecentArt();

      this.state.accountInterval = setInterval(() =>{
        if (this.state.web3.eth.accounts[0] !== this.state.account) {
          var account = this.state.web3.eth.accounts[0];
          this.setState({ account });
          this.getMyArt();
          this.getRecentArt();
        }
      }, 100);
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <Banner title="Home" account={this.state.account}/>
        <main className="container">
          <AddArtForm addArt={this.addArt}/>
          <Arts state={this.state}  arts={this.state.myArts} title="My art"/>
          <Arts state={this.state} arts={this.state.recentArts} title="Recent arts"/>
        </main>
      </React.Fragment>
    );
  }
  
  addArt(){
    var name = document.getElementById("productName").value;
    var price = document.getElementById("productPrice").value;
    if(price == '')
      price = 0;
    var rand = Math.floor(Math.random() * 3) + 1  ;
    var image = "./images/art"+rand+".jpg";
    
    this.state.myArtemaInstance.addArt(name,image,this.state.web3.toWei(price),"",{from:this.state.account}).then(() => {
      console.log("added product " + name + " " + price);
      this.getMyArt();
    }).catch(function(err){
      console.log(err.message);
    })
    
  } 

  getMyArt(){
    console.log("getMyArt");
    this.state.myArtemaInstance.getArts.call(this.state.account).then((artsres) =>{

      let myArts = [];
      if(artsres.length == 0){
        this.setState({ myArts });
      }
      else{
        let last = artsres.length;
        for(let i = 0 ; i < artsres.length ; i++){
          this.state.myArtemaInstance.getArt.call(artsres[i]).then((art) => {
            myArts.push(this.newArt(art));
            --last;
            if(last == 0){
              this.setState({ myArts });
            }
          });

        }
      }
      
      
    }).catch(function(err){
      console.log(err.message);
    })
  }

  getRecentArt(){
    console.log("getRecentArt");
    this.state.myArtemaInstance.getArtsLength.call().then((length) =>{
      let recentArts = [];
      if(length == 0){
        this.setState({ recentArts });
      }
      else{
        let last = 6;
        for(var i = length -1 ; i >= length - 7 && i >= 0; i--){
          this.state.myArtemaInstance.getArt.call(i).then((art) => {
            recentArts.push(this.newArt(art));
            last--;
            if(last ==0 || art[0] == 0){
              this.setState({ recentArts });
            }
          });
        }
      }
    }).catch(function(err){
      console.log(err.message);
    })
  }

  newArt = (_art) =>{
    let art = {
      id : _art[0],
      name: _art[1],
      image: _art[2],
      price: _art[3],
      description: _art[4],
      owner: _art[5],
      buyer : _art[6]
    }
    return art  ;
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
