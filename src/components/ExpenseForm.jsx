import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ members, onAddExpense }) => {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [sharedWith, setSharedWith] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (memberName) => {
    if (sharedWith.includes(memberName)) {
      setSharedWith(sharedWith.filter((m) => m !== memberName));
    } else {
      setSharedWith([...sharedWith, memberName]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSharedWith([]);
    } else {
      setSharedWith(members.map((m) => m.name));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payer || !amount || sharedWith.length === 0) return;

    onAddExpense({ payer, amount: parseFloat(amount), sharedWith });
    setPayer('');
    setAmount('');
    setSharedWith([]);
    setSelectAll(false);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add an Expense</h2>

      <label>Payer:</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)} required>
        <option value="">Select Payer</option>
        {members.map((member, idx) => (
          <option key={idx} value={member.name}>
            {member.name}
          </option>
        ))}
      </select>

      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />

      <label>Shared With:</label>
      <div className="checkbox-group">
        <div className="checkbox-item select-all">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <label><strong>Select All</strong></label>
        </div>
        {members.map((member, idx) => (
          <div key={idx} className="checkbox-item">
            <input
              type="checkbox"
              checked={sharedWith.includes(member.name)}
              onChange={() => handleCheckboxChange(member.name)}
            />
            <label>{member.name}</label>
          </div>
        ))}
      </div>

      <button type="submit" className="submit-btn">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;