import React from 'react';
import "./style.css";
import { Row, Card } from 'antd';
import Button from '../Button';

function Cards({
    currentBalance,
    totalExpense,
    totalIncome,
    showIncomeModal,
    showExpenseModal,
}) {

    return (
        <div>
            <Row className='my-row'>
                  <Card className='my-card' title="Current Balance">
                      <h2>Balance</h2>
                      <p>₹{currentBalance}</p>
                      <Button text={'Reset Balance'} blue={true}/>
                  </Card> 

                  <Card className='my-card' title="Total Income">
                      <h2>Income</h2>
                      <p>₹{totalIncome}</p>
                      <Button text={'Add Income'} blue={true} onClick={showIncomeModal}/>
                  </Card> 

                  <Card className='my-card' title="Total Expense">
                      <h2>Expenses</h2>
                      <p>₹{totalExpense}</p>
                      <Button text={'Add Expense'} blue={true} onClick={showExpenseModal}/>
                  </Card> 
            </Row>

        </div>
    )
}

export default Cards;