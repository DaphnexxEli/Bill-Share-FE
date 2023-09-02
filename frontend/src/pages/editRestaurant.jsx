import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function EditMenuList() {
  const [menuList, setMenuList] = useState([]);
  const [resName, setResName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  const [menuId, setMenuID] = useState();
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        //Set menu list
        const restaurant = await api.getRestaurant(id);
        const menu = await api.getMenuList(id);
        setResName(restaurant.name);
        setMenuList(menu);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetail();
  }, []);

  const filtered = menuList.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const editMenu = (menu) => {
    setMenuID(menu.id);
    setMenuName(menu.name);
    setMenuPrice(menu.price);
    window.my_modal_1.showModal();
  };

  const handleAdd = async () => {
    try {
      await api.addMenu(id, menuName, menuPrice);
      console.log("Add success");
      setMenuName("");
      setMenuPrice(0);
    } catch (error) {
      console.error("Error add menu:", error);
    }
  };

  const handleSave = async () => {
    try {
      await api.setMenu(menuId, menuName, menuPrice, id);
      console.log("Save success");
      setMenuID();
      setMenuName("");
      setMenuPrice(0);
    } catch (error) {
      console.error("Error save menu:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteMenu(menuId);
      console.log("Delete success");
      setMenuID();
      setMenuName("");
      setMenuPrice(0);
    } catch (error) {
      console.error("Error save menu:", error);
    }
  };

  return (
    <div className="container flex justify-center bg-Emerald h-screen">
      <div className="w-2/3 mt-10">
        <h1 className="text-center text-xl font-medium text-Nature my-5 text-white">
          {resName}
        </h1>
        <div className="join h-14 w-full">
          <input
            className="input input-bordered join-item w-full"
            placeholder="Search menu . . ."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-1">
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Menu's name"
            className="input input-bordered w-2/3"
          />
          <input
            type="number"
            value={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
            placeholder="price"
            className="input input-bordered w-1/3"
          />
          <button className="btn btn-primary w-full my-2 bg-Amber text-Stone" onClick={handleAdd}>
            Add New Menu
          </button>
        </div>
        <div className="overflow-x-auto h-2/3">
          <table className="table table-pin-rows h-full w-full bg-neutral text-white">
            <thead>
              <tr>
                <th className="text-white">ID</th>
                <th className="text-white">Menus</th>
                <th className="text-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .sort((a, b) => a.id - b.id)
                .map((menu) => (
                  <tr
                    className="hover cursor-pointer h-10"
                    key={menu.id}
                    onClick={() => editMenu(menu)}
                  >
                    <td>{menu.id}</td>
                    <td>{menu.name}</td>
                    <td>{menu.price}</td>
                  </tr>
                ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Menu ID : {menuId}</h3>
            <p className="py-4">Menu Name</p>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
            <p className="py-4">Price</p>
            <input
              type="number"
              value={menuPrice}
              onChange={(e) => setMenuPrice(e.target.value)}
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-outline btn-success"
                onClick={handleSave}
              >
                Save
              </button>
              <button className="btn btn-outline">Close</button>
              <button
                className="btn btn-outline btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
}
