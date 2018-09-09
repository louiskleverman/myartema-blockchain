import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import MyArtema from '../../build/contracts/MyArtema.json'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from "./components/navBar.jsx"
import { BrowserRouter , Route, Switch} from "react-router-dom"
import Home from "./pages/Home.jsx"
import AddArt from "./pages/AddArt.jsx"
import ExploreArt from "./pages/ExploreArt.jsx"
import MyAccount from "./pages/MyAccount.jsx"
import Account from './pages/Account.jsx'
import ArtPage from './pages/ArtPage.jsx'
import Error from './pages/Error.jsx'
import '../css/main.css'
import Transactions from './pages/Transactions.jsx'

class App extends React.Component {
  state = {
    account: '0x0',
    myArtemaInstance: null,
    accountInterval: null,
    updateArtsInterval:null,
    web3: null,
    artistName: null,
    myArts: [],
    recentArts: [],
    transactions : [{
        id : 0,
        type : "like",
        status : "pending"
      },{
        id : 1,
        type : "upload",
        status : "done"
      },{
        id : 2,
        type : "donation",
        status : "failed"
      }
    ]
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

    this.getMyArt = this.getMyArt.bind(this)
    this.getRecentArt = this.getRecentArt.bind(this)
    this.state.account = this.state.web3.eth.accounts[0]

    

  }

  componentDidMount() {
    this.myArtema.deployed().then((myArtemaInstance) => {
      this.state.myArtemaInstance = myArtemaInstance;
      this.getMyArt();
      this.getRecentArt();

      this.state.myArtemaInstance.getArtistName.call(this.state.account).then((name) =>{
        console.log("name",name);
        this.setState({name})
      });

      this.state.accountInterval = setInterval(() =>{
        if (this.state.web3.eth.accounts[0] !== this.state.account) {
          var account = this.state.web3.eth.accounts[0];
          this.setState({ account });
          this.state.myArtemaInstance.getArtistName.call(this.state.account).then((name) =>{
            console.log("name",name);
            this.setState({name})
          });
        }
      }, 100);

      this.updateArtsInterval = setInterval(() =>{
        this.getMyArt();
        this.getRecentArt();
      }, 1000);
    });
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <NavBar name={this.state.name}/>
          <Transactions state={this.state}/>
          <Switch>
            <Route path="/" render={(props) => <Home changeName={this.changeName} {...props} state={this.state}/>} exact/>
            <Route path="/addArt" render={(props) => <AddArt {...props} state={this.state}/>}/>
            <Route path="/exploreArt" render={(props) => <ExploreArt {...props} state={this.state}/>}/>
            <Route path="/myAccount" render={(props) => <MyAccount {...props} state={this.state} newArt={this.newArt}/>}/>
            <Route path="/artist/:id" render={(props) => <Account {...props} state={this.state} newArt={this.newArt}/>}/>
            <Route path="/art/:id" render={(props) => <ArtPage {...props} state={this.state} newArt={this.newArt}/>}/>
            <Route component={Error} />
          </Switch>  
        </div>
      </BrowserRouter>
    );
  }
  

  getMyArt(){
    //console.log("getMyArt");
    this.state.myArtemaInstance.getArts.call(this.state.account).then((artsres) =>{

      let myArts = [];
      if(artsres.length == 0){
        if(JSON.stringify(myArts) != JSON.stringify(this.state.myArts))
          this.setState({ myArts });
      }
      else{
        let last = artsres.length;
        for(let i = 0 ; i < artsres.length ; i++){
          this.state.myArtemaInstance.getArt.call(artsres[i]).then((art) => {
            myArts.push(this.newArt(art));
            --last;
            if(last == 0){
              if(JSON.stringify(myArts) != JSON.stringify(this.state.myArts))
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
    //console.log("getRecentArt");
    this.state.myArtemaInstance.getArtsLength.call().then((length) =>{
      let recentArts = [];
      let numberToLoad = 12;

      if(length == 0){
        if(JSON.stringify(recentArts) != JSON.stringify(this.state.recentArts))
          this.setState({ recentArts });
      }
      else{
        let last = numberToLoad;
        for(var i = length -1 ; i >= length - numberToLoad && i >= 0; i--){
          this.state.myArtemaInstance.getArt.call(i).then((art) => {
            recentArts.push(this.newArt(art));
            last--;
            if(last ==0 || art[0] == 0){
              if(JSON.stringify(recentArts) != JSON.stringify(this.state.recentArts)){
                this.setState({ recentArts });
              }
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
      id : parseInt(_art[0]),
      name: _art[1],
      image: _art[2],
      price: parseInt(_art[3]),
      description: _art[4],
      owner: _art[5],
      buyer : _art[6]
    }
    return art  ;
  }

  changeName = () =>{
    let name = document.getElementById("artistName").value;
    this.state.myArtemaInstance.changeArtistName(name,{from:this.state.account}).then(()=>{
        this.setState({name})
    });
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
