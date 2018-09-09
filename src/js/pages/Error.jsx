import React from 'react'
import { Redirect } from 'react-router-dom'

class Error extends React.Component{
   
   
    render(){
        return(
            <React.Fragment>
                <Redirect to="/"/>
            </React.Fragment>
        )   
      
    }   
}

export default Error