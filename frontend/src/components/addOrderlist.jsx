import React, { useState } from "react";

export default function addOrder({
  id,
  name,
  price,
  memberpay,
  memberlist,
  close,
  orderlist,
  setOrderlist,
}) {
  const [orderName, setorderName] = useState(name);
  const [orderPrice, setorderPrice] = useState(price);
  const [selectedMembers, setSelectedMembers] = useState(memberpay);

  const handleMemberClick = (name) => {
    if (selectedMembers.includes(name)) {
      setSelectedMembers(selectedMembers.filter((member) => member !== name));
    } else {
      setSelectedMembers([...selectedMembers, name]);
    }
  };

  const handleSubmit = () => {
    const index = orderlist.findIndex((item) => item.id === id);
    orderlist[index].name = orderName;
    orderlist[index].price = orderPrice;
    orderlist[index].cost = orderPrice/selectedMembers.length;
    orderlist[index].pay = selectedMembers;
    setOrderlist(orderlist);
    console.log(orderName);
    console.log(orderPrice);
    console.log(selectedMembers);
    console.log();
    close();
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Menu List</h2>
          <p>Menu Name</p>
          <input
            type="text"
            value={orderName}
            onChange={(e) => setorderName(e.target.value)}
          />
          <p>Price</p>
          <input
            type="number"
            value={orderPrice}
            onChange={(e) => setorderPrice(e.target.value)}
          />
          <br />
          <div className="grid grid-cols-5 col-span-2 gap-2">
            {memberlist.map((item) => (
              <span
                key={item.id}
                className={`text-Stone text-left border ${
                  selectedMembers.includes(item.name) ? "bg-Green" : ""
                }`}
                onClick={() => handleMemberClick(item.name)}
              >
                {item.name}
              </span>
            ))}
          </div>

          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-Emerald font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Ok
          </button>
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-Emerald font-bold py-2 px-4 rounded"
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
