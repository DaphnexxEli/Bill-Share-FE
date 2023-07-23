import React, { useState } from "react";

export default function addOrder({name, price, memberlist}) {
  const [open, setOpen] = useState(false);
  const [orderName, setorderName] = useState("");
  const [orderPrice, setorderPrice] = useState(0);
  const [orderMember, setorderMember] = useState([]);
  const [count, setcount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(orderName);
    console.log(orderPrice);
    console.log(orderMember);
    console.log();
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        เปิด Popup
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Menu List</h2>
            <p>Menu Name</p>
            <input type="text" defaultValue={orderName} />
            <p>Price</p>
            <input type="number" defaultValue={0} />
            <br />
            <button className="mt-4 bg-red-500 hover:bg-red-700 text-Emerald font-bold py-2 px-4 rounded"
              onClick={handleClose}
              >
                Ok
              </button>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-Emerald font-bold py-2 px-4 rounded"
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
