import React from 'react'

class TransactionCard extends React.Component{
    render(){
        let id = this.props.id;
        let transaction = this.props.transactions[id];

        return(
        <div className={"transaction " + transaction.status}>
          <h5>{transaction.type}</h5>
          <p>Status : {transaction.status}</p>
        </div>
        );
    }

}

export default TransactionCard