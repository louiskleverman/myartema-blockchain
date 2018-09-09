import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/becomeArtist.css'

class BecomeArtist extends React.Component{
    
    render(){
        return(
        <React.Fragment>
            <div className="row becomeArtist">
                <div className="col-md-12">
                    <h3>Give yourself an artist name!</h3>
                </div>
                <div className="input-group mb-3 col-md-6">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Artist name</span>
                    </div>
                    <input type="text" id="artistName" className="form-control" placeholder="Artist Name" aria-label="Product Name" />
                </div>

                <div className="col-md-6">
                    <button className="btn btn-secondary" onClick={this.changeName}>Change name</button>
                </div>
            </div>
        </React.Fragment>
        );
    }

    changeName = () =>{
        let name = document.getElementById("artistName").value;
        this.props.state.myArtemaInstance.changeArtistName(name,{from:this.props.state.account}).then(()=>{
            
        });
    }

}

export default BecomeArtist