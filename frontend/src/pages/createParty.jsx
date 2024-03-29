import React, { useState, useEffect } from "react";
import api from "../services/api";
import { LoginPage } from "./LoginPage";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/backButtom";

export const CreateParty = () => {
  const [partyName, setPartyName] = useState("");
  const [billType, setBillType] = useState("");
  const [menu, setMenu] = useState("");
  const [restaurantslist, setRestaurantslist] = useState([]);
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

  const handlePartyNameChange = (event) => {
    setPartyName(event.target.value);
  };

  const handleBillTypeChange = (event) => {
    setBillType(event.target.value);
    if (event.target.value !== "Food&Drink") {
      setMenu("");
    }
  };

  const handleMenuChange = (event) => {
    setMenu(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform submit logic using the input value and selected options
    const host = localStorage.getItem("userID");
    const phone = localStorage.getItem("phone");

    try {
      const response = await api.createParty(partyName, billType, menu, host, phone);
      console.log("Create successfully:", response);
      const party = await api.getParty(localStorage.getItem("code"));
      await api.memberset(host, 0, party.id);
      navigate("/partyPage");
    } catch (error) {
      // Handle login error
      console.error("Create failed:", error.message);
    }

    // Reset input and select values after submitting
    setPartyName("");
    setBillType("");
    setMenu("");
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="items-center bg-Emerald h-screen">
      <BackButton className={"m-10"}/>
      <div className=" flex justify-center text-2xl font-bold text-white pt-24 py-6">
        Create A Party
      </div>
      <div className="flex justify-center">
        <div className="w-64 shadow-2xl bg-Emerald2 rounded-3xl p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="partyName"
              className="block text-white font-sans mb-1"
            >
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
            <label
              htmlFor="billType"
              className="block text-white font-sans mb-1"
            >
              Categories
            </label>
            <select
              id="billType"
              value={billType}
              onChange={handleBillTypeChange}
              className="select-field rounded-md"
            >
              <option value="">None</option>
              <option value="F">Food & Drink</option>
              <option value="H">Home & Rental</option>
              <option value="S">Subscripion & Service</option>
            </select>
          </div>
          {billType === "F" && (
            <div className="mb-4">
              <label htmlFor="menu" className="block text-white mb-1">
                Select Restaurant
              </label>
              <select
                id="menu"
                value={menu}
                onChange={handleMenuChange}
                className="select-field rounded-md"
              >
                <option value="">-- Select an option --</option>
                {restaurantslist.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mt-6 text-center">
            <button type="submit" className="btn btn-primary bg-Emerald">
              Submit
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};
