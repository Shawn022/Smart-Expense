import React from 'react'

const Balance = ({income,expense,balance}) => {

  const cardStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flex: 1,
    minWidth: '150px'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const amountStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#495057'
  };

  const incomeAmountStyle = {
    ...amountStyle,
    color: '#28a745'
  };

  const expenseAmountStyle = {
    ...amountStyle,
    color: '#dc3545'
  };

  const balanceAmountStyle = {
    ...amountStyle,
    color: balance >= 0 ? '#007bff' : '#dc3545'
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={cardStyle}>
        <div style={titleStyle}>Income</div>
        <div style={incomeAmountStyle}>₹{income}</div>
      </div>
      <div style={cardStyle}>
        <div style={titleStyle}>Expense</div>
        <div style={expenseAmountStyle}>₹{expense}</div>
      </div>
      <div style={cardStyle}>
        <div style={titleStyle}>Balance</div>
        <div style={balanceAmountStyle}>₹{balance}</div>
      </div>
    </div>
  )

}

export default Balance
