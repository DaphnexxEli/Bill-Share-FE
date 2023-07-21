import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { LoginPage } from "./LoginPage";

export const CreateParty = () => {
  const [partyName, setPartyName] = useState("");
  const [billType, setBillType] = useState("");
  const [menu, setMenu] = useState("");
  const [host, setHost] = useState("");
  const [restaurantslist, setRestaurantslist] = useState([]);

  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        const data = await api.getRestaurantsList();
        setRestaurantslist(data);   
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantsList();
  }, []);

  const handlePartyNameChange = (event) => {
    setPartyName(event.target.value);
  };

  const handleBillTypeChange = (event) => {
    setBillType(event.target.value);
    if(event.target.value !== "Food&Drink"){
      setMenu("")
    }
  };

  const handleMenuChange = (event) => {
    setMenu(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform submit logic using the input value and selected options
    const host = localStorage.getItem("email");

    try {
      const response = await api.createParty(
        partyName,
        billType,
        menu,
        host
      );

      console.log("Create successfully:", response);
      navigate("/partyPage");
      window.location.reload();
    } catch (error) {
      // Handle login error
      console.error("Create failed:", error.message);
    }

    // Reset input and select values after submitting
    setPartyName("");
    setBillType("");
    setMenu("");
    setHost("");
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-Green flex justify-center items-center">
      <div className="w-full max-w-sm shadow-2xl bg-Emerald2 rounded-3xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create Party Group
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="partyName" className="block text-white mb-1">
              Party Name
            </label>
            <input
              type="text"
              id="partyName"
              required
              value={partyName}
              onChange={handlePartyNameChange}
              className="input-field rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="billType" className="block text-white mb-1">
              Select Bill Type
            </label>
            <select
              id="billType"
              value={billType}
              onChange={handleBillTypeChange}
              className="select-field rounded-md"
            >
              <option value="">None</option>
              <option value="Food&Drink">Food & Drink</option>
              <option value="Home&Hotel">Home & Hotel</option>
              <option value="Subscribe&Service">Subscribe & Service</option>
            </select>
          </div>
          {billType === "Food&Drink" && (
            <div className="mb-4">
              <label htmlFor="menu" className="block text-white mb-1">
                Select Menu
              </label>
              <select
                id="menu"
                value={menu}
                onChange={handleMenuChange}
                className="select-field rounded-md"
              >
                <option value="">-- Select an option --</option>
                {restaurantslist.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-6 text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
