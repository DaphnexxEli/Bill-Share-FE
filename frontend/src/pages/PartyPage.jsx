import React, { useState } from "react";
import './App.css';

function CreateParty() {
  const [guests, setGuests] = useState([]);

  const addGuest = (name) => {
    setGuests([...guests, name]);
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-bold mb-4">Party for a Group</h1>
      <GuestList guests={guests} />
      <AddGuestForm addGuest={addGuest} />
    </div>
  );
}

function GuestList({ guests }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Guest List</h2>
      {guests.length > 0 ? (
        <ul className="list-disc pl-4">
          {guests.map((guest, index) => (
            <li key={index} className="mb-2">{guest}</li>
          ))}
        </ul>
      ) : (
        <p>No guests added yet.</p>
      )}
    </div>
  );
}

function AddGuestForm({ addGuest }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      addGuest(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Enter guest name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Guest
      </button>
    </form>
  );
}

export default CreateParty;
