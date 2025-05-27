import React, { useState } from "react";
import AddMemberForm from "./components/AddMemberForm";
import ExpenseForm from "./components/ExpenseForm";
import SettlementList from "./components/SettlementList";
import { minimizeTransactions } from "./utils/MinimizeTransactions";


const App = () => {
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const addMember = (name) => {
    setMembers([...members, { name, id: members.length }]);
  };

  const addExpense = ({ payer, amount, sharedWith }) => {
    setExpenses([...expenses, { payer, amount, participants: sharedWith }]);
  };

  const calculateBalances = () => {
    const balance = {};
    members.forEach((m) => (balance[m.name] = 0));

    expenses.forEach(({ payer, amount, participants }) => {
      const share = amount / participants.length;
      participants.forEach((p) => {
        if (p !== payer) {
          balance[p] -= share;
          balance[payer] += share;
        }
      });
    });

    const transactions = minimizeTransactions(balance);
    setSettlements(transactions);
  };

  return (
    <div className="app">
      <h1 className="heading">Trip Expense Splitter</h1>
      <AddMemberForm onAdd={addMember} />
      <ExpenseForm members={members} onAddExpense={addExpense} />
      <button className="button1" onClick={calculateBalances}>Calculate Settlements</button>
      <SettlementList settlements={settlements} />
    </div>
  );
};

export default App;