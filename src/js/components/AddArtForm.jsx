import React from 'react';
import "../../css/addArtForm.css"
import { Redirect } from 'react-router-dom'

class AddArtForm extends React.Component{
    
    render(){
        return(
        <div className="row addProductForm">
            <div className="col-md-12">
                <h3>Add a new product</h3>
            </div>
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Product Name</span>
                </div>
                <input type="text" id="productName" className="form-control" placeholder="Product Name" aria-label="Product Name" />
            </div>
            
            
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Product price</span>
                </div>
                <input type="number" id="productPrice" className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1"/>
            </div>

            <button className="btn btn-secondary" onClick={this.addArt}>Add product</button>
        </div>
        );

    }

    
    addArt = () =>{
        
        var name = document.getElementById("productName").value;
        var price = document.getElementById("productPrice").value;
        if(price == '')
            price = 0;
        var rand = Math.floor(Math.random() * 3) + 1  ;
        var image = "images/art"+rand+".jpg";
        
        this.props.state.myArtemaInstance.addArt(name,image,this.props.state.web3.toWei(price),"",{from:this.props.state.account}).then(() => {
            console.log("added product " + name + " " + price);
            
            this.props.history.push('/myAccount');
        //this.getMyArt();
        }).catch(function(err){
            console.log(err.message);
        })
        
    } 

}

export default AddArtForm   