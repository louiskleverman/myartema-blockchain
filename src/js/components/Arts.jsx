import React from 'react'
import '../../css/arts.css'
import Art from './Art.jsx'

class Arts extends React.Component{
    
    render(){
        return(
        <div className="arts row">
            <h3 className="col-md-12">{this.props.title}</h3>
            {   
                this.props.arts.map(art =>(
                    <Art key={art.id} art={art} state={this.props.state} title=""/>
                ))
                
            }
        </div>
        );
    }

}

export default Arts