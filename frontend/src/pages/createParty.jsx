import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { LoginPage } from "./LoginPage";

export const CreateParty = () => {
  const [partyName, setPartyName] = useState("");
  const [billType, setBillType] = useState("");
  const [menu, setMenu] = useState("");

  const handlePartyNameChange = (event) => {
    setPartyName(event.target.value);
  };

  const handleBillTypeChange = (event) => {
    setBillType(event.target.value);
  };

  const handleMenuChange = (event) => {
    setMenu(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform submit logic using the input value and selected options
    console.log("Party Name:", partyName);
    console.log("Bill Type:", billType);
    console.log("Menu:", menu);

    // Reset input and select values after submitting
    setPartyName("");
    setBillType("");
    setMenu("");
  };

  const token = localStorage.getItem("userToken");
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
              <option value="">-- Select an option --</option>
              <option value="option1">Food & Drink</option>
              <option value="option2">Home & Hotel</option>
              <option value="option3">Subscribe & Service</option>
            </select>
          </div>
          {billType === "option1" &&
          (
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
                <option value="optionA">Jame Land</option>
                <option value="optionB">Idea Land</option>
                <option value="optionC">Happy restaurant</option>
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
