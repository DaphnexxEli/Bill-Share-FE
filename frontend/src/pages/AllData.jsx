import React, { useState, useEffect } from "react";
import api from "../services/api";
import { LoginPage } from "./LoginPage";
import { useNavigate } from "react-router-dom";

export const Data = () => {
  const [restaurantslist, setRestaurantslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
  }, []);

  const filteredRestaurants = restaurantslist.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="container flex justify-center bg-Emerald h-screen">
      <div className="w-2/3 mt-10">
        <h1 className="text-center text-xl font-medium text-Nature my-5">
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
        <div><button className="btn w-full bg-Green text-neutral" onClick={(e) => setSearchTerm(e.target.value)}>Add New Restaurant</button></div>
        <div className="overflow-x-auto h-2/3 mt-3">
          <table className="table table-pin-rows h-full w-full bg-neutral">
            <thead>
              <tr>
                <th>ID</th>
                <th>Restaurants</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants
                .sort((a, b) => a.id - b.id)
                .map((restaurant) => (
                  <tr className="hover cursor-pointer h-10" key={restaurant.id} onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
                    <td>{restaurant.id}</td>
                    <td>{restaurant.name}</td>
                  </tr>
                ))}
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
