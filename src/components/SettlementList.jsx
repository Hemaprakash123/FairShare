import React from 'react';
import './SettlementList.css';

const SettlementList = ({ settlements }) => {
  return (
    <div className="settlement-container">
      <h2 className="settlement-title">💰 Settlements</h2>
      {settlements.length === 0 ? (
        <p className="settlement-message">🎉 All expenses are settled! No one owes anything.
        </p>
      ) : (
        <ul className="settlement-list">
          {settlements.map((settlement, index) => (
            <li key={index} className="settlement-item">
              💸 <strong>{settlement.from}</strong> pays <strong>{settlement.to}</strong> ₹{settlement.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SettlementList;