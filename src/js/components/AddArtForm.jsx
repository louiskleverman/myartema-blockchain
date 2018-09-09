import React from 'react';
import "../../css/addArtForm.css"
import { Redirect } from 'react-router-dom'
import ipfs from '../ipfs'

class AddArtForm extends React.Component{
    state = {
        buffer : null
    }

    render(){
        let src = this.state.buffer != null ? this.state.buffer : "";
        let previewClasses = this.state.buffer != null ? "imagePreview" : ""
        return(
        <div className="row addProductForm">
            <div className="col-md-12">
                <h3>Add a new product</h3>
            </div>


            <div className="input-group mb-3 col-md-12">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Product Name</span>
                </div>
                <input required type="text" id="productName" className="form-control" placeholder="Product Name" aria-label="Product Name" />
            </div>
            
            
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Product price</span>
                </div>
                <input type="number" id="productPrice" className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3  col-md-6">
                <div className="input-group-prepend">
                    <span className="input-group-text">Image</span>
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="productImage" onChange={this.imageListener} required/>
                    <label className="custom-file-label" for="productImage">Choose file</label>
                </div>
            </div>

            <div className={previewClasses}><img src={src}/></div>

            <button className="btn btn-secondary" onClick={this.addArt}>Add product</button>
        </div>
        );

    }

    imageListener = () =>{
        const file = document.getElementById("productImage").files[0]
        const reader = new window.FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
            console.log('buffer', this.state.buffer)  
        }
    }

    
    addArt = () =>{
        var name = document.getElementById("productName").value;
        var price = document.getElementById("productPrice").value;
        if(price == '')
            price = 0;
        
        if(this.state.buffer == null || name == ''){
            alert("Please fill out the form")
            return
        }
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
            if(error) {
                console.error(error)
            }
            else{
                this.props.state.myArtemaInstance.addArt(name,result[0].hash,this.props.state.web3.toWei(price),"",{from:this.props.state.account}).then(() => {
                   // console.log("added product " + name + " " + price); 
                    this.props.history.push('/myAccount');
                })
            }
        })
        
        
    } 

}

export default AddArtForm   