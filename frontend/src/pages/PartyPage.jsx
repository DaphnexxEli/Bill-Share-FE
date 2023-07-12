import React, { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import "../App.css";

export const PartyPage = () => {
  const navigate = useNavigate();
  const [partyName, setPartyName] = useState("");
  const [type, setType] = useState("");
  // const [host, setHost] = useState("");
  const [menu, setMenu] = useState("");
  const [clickedPicture, setClickedPicture] = useState(null);
  const [showDataBox, setShowDataBox] = useState(false);
  const [inputText, setInputText] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const data = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Mango",
    "Grapes",
    "Watermelon",
  ];

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm("");
    setFilteredData([]);
  };

  const handlePictureClick = (pictureId) => {
    console.log("Picture clicked!");
    setClickedPicture(pictureId);
    setShowDataBox(true);
    setMenu(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.partyset(partyName, type, menu, host);

      // store user token in local storage or state
      localStorage.setItem("partyname", response.partyName);
      localStorage.setItem("type", response.type);
      localStorage.setItem("menu", response.menu);
      // localStorage.setItem("host", response.host);

      console.log("Process successfully:", response);
      navigate("/");
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error("Process failed:", error.message);
    }

    // Reset the form
    setPartyName("");
    setType("");
    // setHost("");
    setMenu("");
    setInputText("");
  };

  const token = localStorage.getItem("userToken");
  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="hero min-h-screen bg-Green">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold card-body text-Stone">
            Party Group
          </h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-Emerald">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone">Party Name</span>
                </label>
                <input
                  type="text"
                  value={partyName}
                  required
                  onChange={(e) => setPartyName(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-Stone"> Menu </span>
                </label>

                <div class="grid grid-cols-4 gap-2">
                  <div class="col-span-3">
                    <input
                      type="text"
                      placeholder={selectedItem}
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    {filteredData.length > 0 && (
                      <ul>
                        {filteredData.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectItem(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {selectedItem && <p>Selected Item: {selectedItem}</p>}
                  </div>

                  <div className="col-span-1">
                    <img
                      src="./dist/add.png"
                      alt="add"
                      className="h-6"
                      onClick={() => handlePictureClick("pictureId")}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  class="bg-Emerald2 "
                  type="submit"
                  className="btn btn-primary"
                >
                  <Link
                    to="/"
                    className="label-text-alt link link-hover text-Stone"
                  >
                    Next
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
