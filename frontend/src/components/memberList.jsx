import React, { useState } from "react";

export default function Memberlist({ memberlist }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        Memberlist
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Member List</h2>
            {memberlist.map((member) => (
              <div key={member.id}>
                <p>id: {member.id}</p>
                <p>name: {member.name}</p>
                <p>price: {member.price}</p>
              </div>
            ))}
            <br />
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
