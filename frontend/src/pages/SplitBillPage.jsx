import React, { useState } from "react";

export const SplitBillPage = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const members = ["John", "Jane", "Mike", "Emily", "David"]; // Mock Member

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleItemPriceChange = (event) => {
    setItemPrice(parseFloat(event.target.value));
  };

  const handleMemberChange = (event, memberId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  const handleAddItem = () => {
    if (itemName === "" || itemPrice === "") {

    } else {
      const newItem = {
        name: itemName,
        price: itemPrice,
        members: selectedMembers,
      };
      setItems([...items, newItem]);
      setItemName("");
      setItemPrice("");
      setSelectedMembers([]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const calculateShare = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return 0;

    const numMembers = item.members.length;
    if (numMembers === 0) return 0;

    const share = item.price / numMembers;
    return share.toFixed(2);
  };

  const renderItems = () => {
    return items.map((item) => (
      <div key={item.id} className="flex mb-4">
        <div className="flex-grow">
          <p className="font-bold">{item.name}</p>
          <p className="text-gray-500">Price: {item.price} USD</p>
          <p className="text-gray-500">
            Share per member: {calculateShare(item.id)} USD
          </p>
          <div className="flex mt-2">
            {members.map((memberId) => (
              <label key={memberId} className="flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(memberId)}
                  onChange={(event) => handleMemberChange(event, memberId)}
                  className="mr-2"
                />
                <span>{memberId}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Split Bill</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={itemName}
          onChange={handleItemNameChange}
          placeholder="Item Name"
          required
          className="mr-2 px-2 py-1 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="number"
          step="1"
          value={itemPrice}
          onChange={handleItemPriceChange}
          placeholder="Price"
          required
          className="mr-2 px-2 py-1 border border-gray-300 rounded focus:outline-none"
        />
        <button
          onClick={handleAddItem}
          className="px-2 py-1 border border-blue-500 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
      </div>
      {renderItems()}
      <div className="mt-4">
        <h3 className="font-bold mb-2">Total:</h3>
        <p>{calculateTotal()} USD</p>
      </div>
    </div>
  );
};
