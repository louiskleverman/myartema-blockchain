import React from 'react';
import "../../css/addArtForm.css"

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

            <button className="btn btn-secondary" onClick={this.props.addArt}>Add product</button>
        </div>
        );

    };

}

export default AddArtForm   