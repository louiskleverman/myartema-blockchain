import React from 'react'
import '../../css/transactions.css'
import TransactionCard from '../components/TransactionCard.jsx'

class Transactions extends React.Component{
    state = {
        toggle : false
    }
    render(){
        return(
        <div className="transactions">
            <div className="transactionButton" onClick={this.toggleTransactions}>Transactions </div>
            <div id="transactionList">
                {
                    this.props.state.transactions.map(transaction =>(
                        <div>
                        <TransactionCard transactions={this.props.state.transactions} id={transaction.id} key={transaction.id}/>
                        </div>
                    ))
                }
            </div>
        </div>
        );
    }

    toggleTransactions = () => {
        if(!this.state.toggle){
            document.getElementById("transactionList").style.height = "300px";
            this.setState({toggle : true});
        }
        else{ 
            document.getElementById("transactionList").style.height = "0px";
            this.setState({toggle : false});
        }
    }

}

export default Transactions