import React, { useState, useEffect } from "react";
import api from "../services/api";
import { LoginPage } from "./LoginPage";
import { useNavigate } from "react-router-dom";

export const Data = () => {
  const [restaurantslist, setRestaurantslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [restaurantID, setRestaurantID] = useState();
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        const data = await api.getRestaurantsList();
        setRestaurantslist(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (restaurantslist) {
      fetchRestaurantsList();
    }
  }, [restaurantID, restaurantName]);

  const filteredRestaurants = restaurantslist.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addRastaurant = () => {
    handleReset();
    window.my_modal_3.showModal();
  };

  const editRastaurant = (restaurant) => {
    setRestaurantID(restaurant.id);
    setRestaurantName(restaurant.name);
    window.my_modal_2.showModal();
  };

  const confirmDelete = (restaurant) => {
    setRestaurantID(restaurant.id);
    window.my_modal_1.showModal();
  };

  const handleAdd = async () => {
    try {
      await api.addRestaurant(restaurantName);
      console.log("Add success");
      handleReset();
    } catch (error) {
      console.error("Error add rastaurant:", error);
    }
  };

  const handleSave = async () => {
    try {
      await api.setRestaurant(restaurantID, restaurantName);
      console.log("Save success");
      handleReset();
    } catch (error) {
      console.error("Error save rastaurant:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteRestaurant(restaurantID);
      console.log("Delete success");
      handleReset();
    } catch (error) {
      console.error("Error delete rastaurant:", error);
    }
  };

  const handleReset = () => {
    setRestaurantID();
    setRestaurantName("");
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="container flex justify-center bg-Emerald h-screen">
      <div className="w-2/3 mt-10">
        <h1 className="text-center text-2xl font-medium text-white my-5">
          Lists of restaurant
        </h1>
        <div className="h-14 w-full">
          <input
            className="input input-bordered join-item w-full"
            placeholder="Search name . . ."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button
            className="btn w-full bg-Green text-neutral"
            onClick={() => addRastaurant()}
          >
            Add New Restaurant
          </button>
        </div>
        <div className="overflow-x-auto h-2/3 mt-3">
          <table className="table table-pin-rows h-full w-full bg-neutral text-white">
            <thead>
              <tr>
                <th className="text-white">ID</th>
                <th className="text-white">Restaurants</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants
                .sort((a, b) => a.id - b.id)
                .map((restaurant) => (
                  <tr className="h-10" key={restaurant.id}>
                    <td>{restaurant.id}</td>
                    <td>{restaurant.name}</td>
                    <td></td>
                    <td className="grid grid-cols-3 place-items-end">
                      <button
                        onClick={() => editRastaurant(restaurant)}
                        className="place-self-start btn btn-sm btn-square btn-success"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        className="place-self-start btn btn-sm btn-square btn-info"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => confirmDelete(restaurant)}
                        className="btn btn-sm btn-square btn-error"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Confirm delete */}
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">
              Restaurant ID : {restaurantID}
            </h3>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn btn-outline" onClick={handleReset}>
                Close
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </dialog>
        {/* Edit name */}
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">
              Restaurant ID : {restaurantID}
            </h3>
            <p className="py-4">Restaurant Name</p>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn btn-outline" onClick={handleReset}>
                Close
              </button>
              <button
                className="btn btn-outline btn-success"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        </dialog>
        {/* Add dialog */}
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Add New Restaurant</h3>
            <p className="py-4">Restaurant Name</p>
            <input
              type="text"
              placeholder="Enter name . . ."
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn btn-outline" onClick={handleReset}>
                Close
              </button>
              <button
                className="btn btn-outline btn-success"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};
