import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";


export const CreateParty = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelect1Change = (event) => {
        setSelectedOption1(event.target.value);
    };

    const handleSelect2Change = (event) => {
        setSelectedOption2(event.target.value);
    };

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform submit logic using the input value and selected options
        console.log("Input Value:", inputValue);
        console.log("Selected Option 1:", selectedOption1);
        console.log("Selected Option 2:", selectedOption2);
      
    
        // Reset input and select values after submitting
        setInputValue("");
        setSelectedOption1("");
        setSelectedOption2("");
    };

    

  return (
    <div className="hero min-h-screen bg-Green">
    <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald2">
      <h1 className="text-2xl font-bold card-body text-white">Create Party Group</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputField" className="block text-sm font-medium text-white">
            Party Name
          </label>
          <input
            type="text"
            id="inputField"
            value={inputValue}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>
        <div>
          <label htmlFor="select1" className="block text-sm font-medium mt-3 text-white">
            Select bill type
          </label>
          <select
            id="select1"
            value={selectedOption1}
            onChange={handleSelect1Change}
            className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">-- Select an option --</option>
            <option value="option1">Food & Drink</option>
            <option value="option2">Home & Hotel</option>
            <option value="option3">Subscribe & Service</option>
          </select>
        </div>
        <div>
          <label htmlFor="select2" className="block text-sm font-medium mt-3 text-white">Select Menu</label>
          <select
            id="select2"
            value={selectedOption2}
            onChange={handleSelect2Change}
            className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="">-- Select an option --</option>
            <option value="optionA">Jame Land</option>
            <option value="optionB">Idea Land</option>
            <option value="optionC">Happy restaurant</option>
          </select>
        </div>
        <div className="form-control mt-6">
        <Link to='/partyPage'>
        <button type="submit" className="btn btn-primary">
        Submit
        </button>
        </Link>
        </div> 
      </form>
    </div>
    </div>
    </div>
  );
};