import React, { useState } from 'react';
import './AddMemberForm.css';

const AddMemberForm = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName('');
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
      <h2>Add Member</h2>
      <div className="input-group">
        <input
          type="text"
          value={name}
          placeholder="Enter member name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddMemberForm;
