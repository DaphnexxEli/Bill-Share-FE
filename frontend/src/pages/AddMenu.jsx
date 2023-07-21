import React from "react";
import { Link } from "react-router-dom";



export const NewMenu = () => {
  const [newMenu, setNewMenu] = useState('');
  const [MenuList, setMenuList] = useState([]);

  const handleInputChange = (event) => {
    setNewMenu(event.target.value);
  };

  const handleAddMenu = () => {
    if (menu.trim() !== '') {
      setMenuList([...infoList, info]);
      setNewMenu('');
    }
  };

  return (
    <div className="hero min-h-screen bg-Green">
    <div className="hero-content flex-col lg:flex-row-reverse">
    <h1 className="text-2xl font-bold card-body text-Emerald2">Add new menu</h1>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald2">
    
    <h1 className="text-2xl mb-4">Info Box</h1>
      <input
        type="text"
        value={menu}
        onChange={handleInputChange}
        className="w-full bg-white border border-gray-300 rounded px-3 py-2 mb-2"
        placeholder="Type your info..."
      />
      <button
        onClick={handleAddMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Info
      </button>
      <ul className="mt-4">
        {MenuList.map((item, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded mb-2">{item}</li>
        ))}
      </ul>
    </div>
     
      
    </div>
    </div>
);
};




