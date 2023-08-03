import React, { useState } from "react";

export const Restaurant = () => {
  const [newRestaurant, setNewRestaurant] = useState('');


  const handleInputChange = (event) => {
    setNewRestaurant(event.target.value);
  };

  const handleInputChange1 = (event) => {
    setNewMenu(event.target.value);
  };


    setNewRestaurant('');
  

  return (
    <div className="hero min-h-screen bg-Green">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <h1 className="text-2xl font-bold card-body text-Emerald2">Add new menu</h1>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald2">
          <h1 className="text-2xl mb-4">Info Box</h1>
          <input
            type="text"
            value={newRestaurant}
            required
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 mb-2"
            placeholder="Restaurant Name"
          />
          <ul className="mt-4">
            {MenuList.map((item, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded mb-2">
                {item.restaurant} - {item.menu}
              </li>
            ))}
          </ul>
        
          
        </div>
      </div>
    </div>
  );
};




