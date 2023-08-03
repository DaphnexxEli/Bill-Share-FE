import React, { useState } from "react";

export const NewMenu = () => {
  const [newRestaurant, setNewRestaurant] = useState('');
  const [newMenu, setNewMenu] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [menuList, setMenuList] = useState([]);

  const handleEditMenu = (item) => {
    setNewRestaurant(item.restaurant);
    setNewMenu(item.menu);
    setNewPrice(item.price);
    // Assuming there's an 'id' property on the item, you might use it for better tracking or updating the item.
  };

  const handleAddMenu = (event) => {
    event.preventDefault();
    if (newMenu.trim() !== '' && newRestaurant.trim() !== '' && newPrice.trim() !== '') {
      const newMenuItem = {
        restaurant: newRestaurant,
        menu: newMenu,
        price: newPrice,
        id: Date.now() // Adding a unique ID to the new menu item for better tracking.
      };

      setMenuList([...menuList, newMenuItem]);
      setNewRestaurant('');
      setNewMenu('');
      setNewPrice(0);
    }
  };

  const handleClicked = () => {
    console.log("Button Clicked!");
  };

  return (
    <div className="hero min-h-screen bg-Green">
      <div className="hero-content flex-col lg:flex-row-reverse">
      <input
        type="text"
        value={setNewRestaurant}
        onChange={handleEditMenu}
        placeholder="Restaurant."
      />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald2">
          <label className="label grid grid-cols-3 gap-2">
            <span className="label-text text-white text-left">Menu</span>
            <span className="label-text text-white text-right">Price</span>
            {/* Display the list of menus */}
            {menuList.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 col-span-3 gap-2"
                onClick={() => handleEditMenu(item)}
              >
                <span className="text-white text-left border">
                  {item.setNewMenu}
                </span>
                <span className="text-white text-right border">
                  {item.setNewPrice}
                </span>
              
              </div>
            ))}
          </label>

          {/* Add new menu form */}
          <form onSubmit={handleAddMenu}>
            <div className="form-control">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3 bg-Emerald2">
                  <input
                    type="text"
                    placeholder="Menu..."
                    value={newMenu}
                    onChange={(e) => setNewMenu(e.target.value)}
                  />
                  
                  <input
                    type="text"
                    placeholder="Price..."
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>
                <div className="col-span-1 bg-Emerald text-white px-1 py-1 rounded">
                  <button onClick={handleClicked}>+</button>
                </div>
                <div className="form-control" style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit" className="col-span-1 bg-Green text-white px-4 py-1 rounded hover:bg-Green">
                  DONE
                </button>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


